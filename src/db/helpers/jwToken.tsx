import { Token } from "@/interface"
import * as jose from 'jose'
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

interface T {
  _id: string;
  email: string
}

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET variable is not define")
}

const secret = new TextEncoder().encode(JWT_SECRET)

const alg = 'HS256'

export const signToken = async (payload: jose.JWTPayload) => {
    const jwt = await new jose.SignJWT(payload)
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .sign(secret)

  return jwt
}

// export const verifyToken = async <T>(token: string) => {

//   const secret = new TextEncoder().encode(JWT_SECRET)
  
//   let data = await jose.jwtVerify<T>(token, secret)
//   console.log(data.payload, "<<<Data Payload");
  
//   return data
// }

export async function verifyToken<T>(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET)
  
    let data = await jose.jwtVerify<T>(token, secret)
    
    return data.payload
}
