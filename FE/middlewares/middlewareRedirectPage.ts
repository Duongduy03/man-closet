import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export const middlewareRedirectPage = (middleware : CustomMiddleware) => {
  return async (request : NextRequest, event : NextFetchEvent) => {
    const response = NextResponse.next()
    if(request.nextUrl.pathname === "/user"){
      const redirectTo = new URL("/user/dashboard", request.nextUrl.origin);
      return NextResponse.redirect(redirectTo.toString());
    }

    return middleware(request, event, response)
  } 
}