import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

//@ts-ignore
const  {auth } = NextAuth(authConfig);
import { PUBLIC_ROUTES,PROTECTED_SUB_ROUTES, LOGIN, ROOT } from "./lib/routes";

export async function middleware(request: NextRequest) {
    const {nextUrl} = request;
    const session = await auth()
    console.log(session);
    
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, nextUrl.pathname);

    const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

    console.log(isPublicRoute);

    if(!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, nextUrl))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}