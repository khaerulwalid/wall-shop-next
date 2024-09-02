"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
const baseUrl = "http://localhost:3000"

export async function CheckToken(id: string) {
    console.log(id, "<<<ID Check Token");
    
    let token = cookies().get("token")

    if(!token) {
        redirect("/login")
    } else {
        let result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/whistlist", {
            method: "post",
            body: JSON.stringify({productId: id}),
            headers: {
                Cookie: cookies().toString(),
                'Content-Type': 'application/json'
            },
        })
        
        redirect("/whistlist")
    }

}