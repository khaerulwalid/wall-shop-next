import { FormLogin } from "./FormLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  const token = cookies().get("token");

  if (token?.value) {
    redirect("/");
  }

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="hero-content flex-col lg:flex-row-reverse p-20">
        <div className="text-center lg:text-left shrink-1">
          <img src="/login.png" alt="Example Image" width={500} height={500} />
        </div>

        <FormLogin />
      </div>
    </div>
  );
}
