import { deleteWhistlist } from "@/db/model/whistlist";

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    try {
        let idWhistlist = params.id
        console.log("Masuk Remove Whistlist");
        
    
        let result = await deleteWhistlist(idWhistlist)

        return Response.json({
            statusCode: 200,
            message: "Success Delete"
        }, {
            status: 200
        })
    } catch (error) {

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