import { createUser } from "@/db/model/user"
import { createWhistlist, getWhistlist } from "@/db/model/whistlist";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        let data = await request.json()
        console.log(data, "<<<Post Whistlist");
        
        let id: string | null = request.headers.get("x-user-id")
        let newId: number = Number(id)
        
        if(id) {
            let result = await createWhistlist(data, id)
        }

        return Response.json({
            message: "success post"
        }, {
            status: 201
        })
    } catch (error) {

        if(error instanceof z.ZodError) {
            const errPath = error.issues[0].path[0]
            const errorMessage = error.issues[0].message

            return Response.json({
                statusCode: 400,
                message: errorMessage
            }, {
                status: 400
            })
        }

        if(error instanceof Error) {
             return Response.json({
                statusCode: 400,
                message: error.message
          }, {
            status: 400
          })
        }


        return Response.json({
            statusCode: 500,
            message: "Internal server error"
        }, {
            status: 500
        })
        
    }
}



export async function GET(request: Request) {
    try {
        console.log("Masuk GET WHistlis");
        let id: string | null = request.headers.get("x-user-id")

        let result
        if(id) {
            result = await getWhistlist(id)
        }

        return Response.json({
            statusCode: 200,
            data: result,
            status: "success"
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            statusCode: 500,
            message: "Internal server error"
        }, {
            status: 500
        })
    }
}