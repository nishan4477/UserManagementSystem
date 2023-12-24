import { NextResponse } from "next/server";

export function middleware(request){
    console.log('middleware ran');


    if(request.nextUrl.pathname !=='/users'){
        return NextResponse.redirect(new URL('/users', request.url));
    }
}


export const config = {
    matcher: ["/users/:path*"]
};