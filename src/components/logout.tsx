"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  let cookiesUser = cookies();

  if (cookiesUser.has("token")) {
    cookies().delete("token");

    redirect("/login");
  }
}
