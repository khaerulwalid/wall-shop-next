import { User } from "@/interface";
import { comparePassword, hashPassword } from "../helpers/hashPassword";
import { getMongoClientInstance } from "../config";
import { cookies } from "next/headers";

import { z } from "zod";
import { signToken } from "../helpers/jwToken";

type UserInput = Omit<User, "_id">;
type UserLogin = Omit<User, "_id" | "name" | "username">;
const DATABASE_NAME: string = "Wall_Shop_Db";
const COLLECTION_USER: string = "Users";

const getDb = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);

  return db.collection(COLLECTION_USER);
};

type UserSummary = Pick<User, "username" | "email">;
type UserResLogin = Pick<User, "_id" | "email" | "password">;

export const createUser = async (user: UserInput) => {
  const collUser = await getDb();

  const parsedUser = z
    .object({
      name: z.string().optional(),
      username: z.string().nonempty("Username is required"),
      email: z.string().nonempty("Email is required").email(),
      password: z.string().min(5, "Password is min 5 character"),
    })
    .safeParse(user);

  if (!parsedUser.success) {
    throw parsedUser.error;
  }

  const getUserByUsername = await collUser.findOne<UserSummary>({
    username: user.username,
  });

  const getUserByEmail = await collUser.findOne<UserSummary>({
    email: user.email,
  });

  if (getUserByUsername) {
    throw new Error("username already exists");
  }

  if (getUserByEmail) {
    throw new Error("email already exists");
  }

  const modifiedUser: UserInput = {
    ...user,
    password: hashPassword(user.password),
  };

  await collUser.insertOne(modifiedUser);

  const result = await collUser.findOne<UserSummary>(
    { email: user.email },
    {
      projection: { password: 0 },
    }
  );

  return result;
};

export const login = async (user: UserLogin) => {
  const collUser = await getDb();

  const parsedUser = z
    .object({
      email: z.string().nonempty("Email is required").email(),
      password: z.string().nonempty("Password is required"),
    })
    .safeParse(user);

  if (!parsedUser.success) {
    throw parsedUser.error;
  }

  let dataUser = await collUser.findOne<UserResLogin>({ email: user.email });

  if (!dataUser) {
    throw new Error("Email or password invalid");
  }

  let validatePassword = comparePassword(user.password, dataUser.password);

  if (!validatePassword) {
    throw new Error("Email or password invalid");
  }

  let access_token = await signToken({
    id: dataUser._id,
    email: dataUser.email,
  });

  cookies().set("token", access_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return access_token;
};
