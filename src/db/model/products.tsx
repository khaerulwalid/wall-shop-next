import { getMongoClientInstance } from "@/db/config/index"
import { DataProduct } from "@/interface"
import { ObjectId } from "mongodb"

const DATABASE_NAME: string = "Wall_Shop_Db"
const COLLECTION_USER: string = "Products"

const getDb = async () => {
    const client = await getMongoClientInstance()
    const db = client.db(DATABASE_NAME)

    return db.collection(COLLECTION_USER)
}


export const getProducts = async (id: number) => {
    const collProducts = await getDb()
    let limitData = 6
    let dataProducts = await collProducts.find().skip((id - 1) * limitData).limit(limitData).toArray()

    let lengData = await collProducts.countDocuments()

    return {
        data: dataProducts,
        length: lengData
    }
}


export const getProductBySlug = async (slug: string) => {
    console.log(slug, "<<<Masuk slug");
    
    const collProducts = await getDb()

    const product = await collProducts.findOne(
        {slug: slug}
    )
    
    console.log(product, "<<<Product Server");
    
    return product
}

export const searchProduct = async (name: string) => {
    console.log(name, "<<<Name Search");
    
    const collProducts = await getDb()

    const query = { name: { $regex: new RegExp(name, 'i') } };

    const product = await collProducts.find(query).toArray()

    console.log(product, "<<<Search product");
    
    return product
}