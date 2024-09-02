import { redirect } from "next/navigation";
import { logout } from "./logout";

import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const token = cookies().get("token");

  return (
    <div className="navbar fixed z-40 w-full top-0 left-0 bg-gradient-to-b from-slate-400 to-slate-300 text-slate-800">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl text-green-600">
          WallDotId
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {
          token?.value ? (
            <li>
              <Link href="/whistlist">My Whistlist</Link>
            </li>
          ) : null
         }
          

        </ul>
      </div>
      <div className="navbar-end">
        {!token?.value ? (
          <form action={async () => {
            'use server'
            redirect('/login')
          }}>
            <button className="bg-green-600 text-white p-2 rounded-xl cursor-pointer hover:bg-green-700">
              Login
            </button>
          </form>
        ) : (
          <form action={logout}>
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded-xl cursor-pointer hover:bg-green-700"
            >
              Logout
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
