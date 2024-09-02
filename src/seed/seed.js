const { ObjectId } = require("mongodb")
let data = require("../../../db.json")

const { MongoClient } = require("mongodb")

const connectionString = process.env.MONGODB_CONNECTION_STRING

if(!connectionString) {
    throw new Error("MONGODB_CONNECTION_STRING is not define")
}

let client

const getMongoClientInstance = async () => {
    if(!client) {
        client = new MongoClient(connectionString)
        await client.connect()
    }

    return client
}

const DATABASE_NAME = "Wall_Shop_Db"
const COLLECTION_USER = "Products"

const getDb = async () => {
    const client = await getMongoClientInstance()
    const db = client.db(DATABASE_NAME)

    return db.collection(COLLECTION_USER)
}

data = data.products.map(el => {
    el._id = new ObjectId()

    return el
})

async function seedUser() {
    const myColl = await getDb()

    const result = await myColl.insertMany(data);

    console.log(result);
    if(result) {
        console.log("SUCCESS SEED");
    } else {
        console.log('FAILED SEED');
    }
}

seedUser()