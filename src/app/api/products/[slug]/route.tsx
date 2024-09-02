import { getProductBySlug } from "@/db/model/products"
import { getProducts } from "@/db/model/products"

interface Props {
    params: {
        slug: string
    }
}

// /products/1

export async function GET(request: Request, { params }: Props) {
    try {

        let resultProduct = await getProductBySlug(params.slug)

            return Response.json({
                statusCode: 200,
                product: resultProduct
            }, {
                status: 200
            })

        
    } catch (error) {
        console.log(error, '<<<Error ById');
        
        return Response.json({
            statusCode: 500,
            message: "Internal server error"
        }, {
            status: 500
        })
    }
}