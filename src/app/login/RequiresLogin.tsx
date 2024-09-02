
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export function RequiresLogin({children} : PropsWithChildren) {
    const token = cookies().get("token")

    if(token) {
        redirect("/")
    }

    return children
}


// export function HasLogin({children} : PropsWithChildren) {
//     const token = cookies().get("token")

//     if(token) {
//         redirect("/")
//     }

//     return children
// }