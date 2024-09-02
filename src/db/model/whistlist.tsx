import { getMongoClientInstance } from "../config";
import { WhistList } from "@/interface";
import { ObjectId } from "mongodb";
import { z } from "zod";

const DATABASE_NAME: string = "Wall_Shop_Db"
const COLLECTION_USER: string = "Whistlists"

type WhistListInput = Omit<WhistList, "_id" | "userId" | "createdAt" | "updatedAt">;
type WhistListDelete = Omit<WhistList, "productId" | "userId" | "userId" | "createdAt" | "updatedAt">;

const getDb = async () => {
    const client = await getMongoClientInstance()
    const db = client.db(DATABASE_NAME)

    return db.collection(COLLECTION_USER)
}

export const createWhistlist = async (whistlist: WhistListInput, id: string) => {
    
    const collWhistlist = await getDb()

    const parsedWhistlist = z.object({
        productId: z.string().nonempty("Product id is required"),
    }).safeParse(whistlist)

    if(!parsedWhistlist.success) {
        throw parsedWhistlist.error
    }

    const modifiedWhistlist = {
        ...whistlist,
        productId: new ObjectId(whistlist.productId),
        userId: new ObjectId(id),
        createdAt: new Date(),
        updatedAt: new Date()
    }


    const result = await collWhistlist.insertOne(modifiedWhistlist)

    return result
}



export const deleteWhistlist = async (idWhistlist: string) => {
    const collWhistlist = await getDb()

    const getWhistlistById = await collWhistlist.findOne(
        { _id: new ObjectId(idWhistlist) }
    );

    if(!getWhistlistById) {
        throw new Error("Whistlist not found")
    }

    const result = await collWhistlist.deleteOne({
        _id: new ObjectId(idWhistlist)
    })

    return result
}

export const getWhistlist = async (id: string) => {
    const collWhistlist = await getDb()
    console.log(id, "<<<ID GeT WHISTLIST");
    
const agg = [
    {
      '$match': {
        'userId': new ObjectId(id)
      }
    }, {
      '$lookup': {
        'from': 'Products', 
        'localField': 'productId', 
        'foreignField': '_id', 
        'as': 'productDetail'
      }
    }
  ];

  const cursor = collWhistlist.aggregate(agg);
  const result = await cursor.toArray();

    return result
}