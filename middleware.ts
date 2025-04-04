
import { cookies } from "next/headers";
import { Nextreq, NextResponse}  from "next/server";

//import { decodeJwt } from "jose";

//import { envConfig } from "./config/env";
//import { cookieExpiry } from "./constants/app";

const protectedRoutes = ["/", "/artist", "/music","/manager"];
const publicRoutes = ["/public"];
const authRoutes = ["/login"];

export default async function middleware(req: Nextreq) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  //const isAuthRoute = authRoutes.includes(path);

  if (isPublicRoute) return NextResponse.next();

  const cookieStore = await cookies();
  if (isProtectedRoute) {
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      const refreshToken = cookieStore.get("refresh_token")?.value;
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
  }
  try{
    const response = await fetch('http://localhost:80000/token',{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${accessToken}`,
        'Content-Type':'application/json',
      },

    })
    const data =await response.json();
   if (data.accessToken ) {
      const nextResponse = NextResponse.next();
      nextResponse.cookies.set('accessToken', data.accessToken);
      nextResponse.cookies.set('refreshToken', data.refreshToken);
      return nextResponse;
    }
    return NextResponse.redirect(new URL('/login',req.url))
  }catch(error){
    console.error("Error refreshing token: ", error)
  }
  }

  return NextResponse.next();
}
