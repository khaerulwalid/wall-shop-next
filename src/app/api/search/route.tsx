import { searchProduct } from "@/db/model/products"

interface SearchBody {
    search: string
}

export async function POST(request: Request) {
    try {
        const body: SearchBody = await request.json()

        const products = await searchProduct(body.search)

        return Response.json({
            statusCode: 200,
            data: products,
            message: "success"
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