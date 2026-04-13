import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RoleId } from "./utils/enums";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get("token")?.value;
    const roleId = req.cookies.get("roleId")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/menu") ||
        pathname.startsWith("/role")
    ) {
        if (
            String(roleId) !== String(RoleId.ADMIN) &&
            String(roleId) !== String(RoleId.SUPERADMIN)
        ) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/role/:path*",
        "/menu/:path*",
    ],
};