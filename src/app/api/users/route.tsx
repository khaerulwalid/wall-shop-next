import { createUser } from "@/db/model/user"
import { z } from "zod";

export async function POST(request: Request) {
    try {
        let user = await request.json()
    
        let data = await createUser(user)

        return Response.json({
            statusCode: 201,
            message: "Success register user",
            data
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