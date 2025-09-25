import { NextResponse } from "next/server";
import { auth } from "./utils/authOptions";

export async function middleware(request) {
  const { nextUrl } = request;
  
  try {
    const session = await auth();
    const isAuthenticated = !!session?.user;
    const userRole = session?.user?.role;
    const userRoleLc = typeof userRole === "string" ? userRole.toLowerCase() : "";

    console.log("Middleware - Path:", nextUrl.pathname, "Authenticated:", isAuthenticated, "Role:", userRole);

    const isPublic =
      nextUrl.pathname === "/" || 
      nextUrl.pathname.endsWith("/superadmin/login") ||
      nextUrl.pathname.endsWith("/login");

    // If not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublic) {
      console.log("Redirecting to home - not authenticated");
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    const isAdmin = nextUrl.pathname.startsWith("/admin");
    const isSuperAdmin = nextUrl.pathname.startsWith("/superadmin");

    // If authenticated and on public page, redirect to appropriate dashboard
    if (isAuthenticated && isPublic) {
      if (userRole === "storeAdmin" || userRoleLc === "storeadmin") {
        console.log("Redirecting store admin to dashboard");
        return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
      } else if (userRole === "superadmin" || userRoleLc === "superadmin") {
        console.log("Redirecting superadmin to dashboard");
        return NextResponse.redirect(new URL("/superadmin/dashboard", nextUrl));
      }
    }

    // Check admin access
    if (isAuthenticated && isAdmin && !(userRole === "storeAdmin" || userRoleLc === "storeadmin")) {
      console.log("Redirecting - wrong role for admin area");
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Check superadmin access
    if (isAuthenticated && isSuperAdmin && !(userRole === "superadmin" || userRoleLc === "superadmin")) {
      console.log("Redirecting - wrong role for superadmin area");
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    console.log("Middleware - Access granted");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = { matcher: ["/", "/admin/:path*", "/superadmin/:path*"] };
