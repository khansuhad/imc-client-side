import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export const middleware = async(req) => {

    const token =await getToken({req})
    const isAdminUser = token?.role === "admin"
    const isAdminSpecificRoute = req.nextUrl.pathname.startsWith("/dashboard/admin")

    if(isAdminSpecificRoute && !isAdminUser){
        const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url))
    }


return NextResponse.next()
}