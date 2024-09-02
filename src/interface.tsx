import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface WhistList {
    _id: ObjectId;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Token {
    id: ObjectId
}

export interface DataProduct {
        _id: string
        name: string
        slug: string
        description: string
        excerpt: string
        price: number
        tags: string[]
        thumbnail: string
        images: string[]
        createdAt: string
        updatedAt: string
  }


  export interface Product {
    statusCode: number,
    data: DataProduct[]
}

export interface ErrorBody {
    statusCode: number
    message: string
}


export interface ResponseMyWhistlist {
    statusCode: number
    data: MyWhistlist[]
    status: string
  }
  
  export interface MyWhistlist {
    _id: string
    productId: string
    userId: string
    createdAt: string
    updatedAt: string
    productDetail: ProductDetail[]
  }
  
  export interface ProductDetail {
    _id: string
    name: string
    slug: string
    description: string
    excerpt: string
    price: number
    tags: string[]
    thumbnail: string
    images: string[]
    createdAt: string
    updatedAt: string
  }
  