// import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export const middleware = async (req: NextRequest) => {
    // return await updateSession(req);
    return await updateSession(req);
    // const isLoggedIn = true; //TODO: Replace with actual authentication logic

    // if (!isLoggedIn && req.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // if (isLoggedIn && req.nextUrl.pathname.startsWith('/auth')) {
    //     return NextResponse.redirect(new URL('/dashboard', req.url));
    // }

    // return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - logo.svg (svg file)
         * - favicon.ico (favicon file)
         * - public folder
         * - api folder
         */
        '/((?!_next/static|_next/image|logo.svg|favicon.ico|public/|api/|google[\\w-]+\\.html|sitemap.xml|robots.txt).*)',
    ],
};