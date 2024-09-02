import { searchProduct } from "@/db/model/products"

interface SearchProps {
    params: {
        name: string
    }
}

export async function GET(request: Request, { params }: {params: {name: string}}) {
    try {
        const products = await searchProduct(params.name)

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