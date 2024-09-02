"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
const baseUrl = "http://localhost:3000"

export async function ActionRemoveWhistlist(id: string) {
    let token = cookies().get("token")

    if(!token) {
        redirect("/login")
    } else {
        console.log("Masuk Fetch Post");

        let result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/whistlist/${id}`, {
            method: "delete",
            headers: {
                Cookie: cookies().toString(),
                'Content-Type': 'application/json'
            },
        })

        let hasil = await result.json()
        console.log(hasil, "<<<Result Remove");
        

        revalidatePath("/whistlist")

        // const responseWhistlist = await fetch(proccess.env.BASE_URL + "/api/whistlist`, {
        //     method: "get"
        // })
        
        //   const whistListBody = await responseWhistlist.json()
        //   setWhistList(whistListBody)
        
    }

}