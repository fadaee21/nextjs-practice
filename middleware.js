import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const token = req.cookies.get("token");
//if there is not token and path is "/posts" do this...
  if (!token && req.nextUrl.pathname == "/posts") {
    //it will log in terminal not browser
    console.log("aaaaaaaaaaaaaa")
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  //in this way you can cover all page in auth folder
  if (token && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
