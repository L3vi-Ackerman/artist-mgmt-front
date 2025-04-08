import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/", "/artist", "/music", "/manager"];
const publicRoutes = ["/public"];
// const authRoutes = ["/login"]; // Removed or will be used later

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isPublicRoute) return NextResponse.next();

  const cookieStore = await cookies();

  if (isProtectedRoute) {
    let accessToken = cookieStore.get("accessToken")?.value; // Accessed directly
    const refreshToken = cookieStore.get("refreshToken")?.value; // Accessed directly

    if (!accessToken && refreshToken) {
      try {
        const refreshResponse = await fetch(
          "http://localhost:8000/refreshToken/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
            //body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refresh;

          const nextResponse = NextResponse.next();

          if (typeof newAccessToken === "string") {
            nextResponse.cookies.set("access_token", newAccessToken, {
              httpOnly: true,
              path: "/",
            });
          } else {
            console.error(
              "Error: accessToken from refresh response is not a string:",
              newAccessToken
            );
            // Optionally handle this error
          }

          if (typeof newRefreshToken === "string") {
            nextResponse.cookies.set("refresh_token", newRefreshToken, {
              httpOnly: true,
              path: "/",
            });
          } else if (newRefreshToken !== undefined) {
            console.warn(
              "Warning: refreshToken from refresh response is not a string or undefined:",
              newRefreshToken
            );
            // You might choose to not update the refresh token
          }

          return nextResponse;
        } else {
          // Refresh failed, redirect to login
          return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
      } catch (error) {
        console.error("Error refreshing token: ", error);
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
    }

    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes],
};
