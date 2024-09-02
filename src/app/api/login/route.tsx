import { login } from "@/db/model/user";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    let user = await request.json();

    let access_token = await login(user);

    return Response.json(
      {
        statusCode: 200,
        message: "success",
        data: {
          access_token,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues[0].message;

      return Response.json(
        {
          statusCode: 400,
          message: errorMessage,
        },
        {
          status: 400,
        }
      );
    }

    if (error instanceof Error) {
      return Response.json(
        {
          statusCode: 401,
          message: error.message,
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
