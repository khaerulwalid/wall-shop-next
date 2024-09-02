import { getProductBySlug } from "@/db/model/products"
import { getProducts } from "@/db/model/products"

interface Props {
    params: {
        id: string
    }
}

// /products/1

export async function GET(request: Request, { params }: Props) {
    let result = await getProducts(Number(params.id))

    return Response.json({
        statusCode: 200,
        data: result.data,
        length: result.length
    })
}