// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname == "/") {
    console.log("you are in home page");
  }
  if (request.nextUrl.pathname.startsWith("/posts*")) {
    console.log("hello  posts");
    return NextResponse.redirect(new URL("/about-2", request.url));
  }
}

// export const config = {
//   matcher: ["/posts/:path*", "/"],
// };
