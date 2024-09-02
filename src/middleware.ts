"use server"
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./db/helpers/jwToken";
import * as jose from 'jose'

interface JwtReturn {
    id: string
    email: string
    iat: number
  }

type GetTokenReturnType = Awaited<ReturnType<typeof verifyToken>>;

export const middleware = async (request: NextRequest) => {
    try {
        const token = cookies().get("token")
        
        if(request.url.includes("/api/whistlist")) {
            if(!token) {
                return NextResponse.json({
                    statusCode: 401,
                    message: "unauthorized"
                }, {
                    status: 401
                })
            }

            // Verify token
            const decoded = await verifyToken<{id: string; email: string}>(token.value)

            const requestHeader = new Headers(request.headers)
            // set custom headers
            
            requestHeader.set("x-user-id", decoded.id)
            requestHeader.set("x-user-email", decoded.email)
            
            
            
            return NextResponse.next({
                headers: requestHeader
            })
        }
    } catch (error) {
        console.log(error, "<<Error TOken");``
    }
}