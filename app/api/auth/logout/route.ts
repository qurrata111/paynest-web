import api from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = NextResponse.json({ message: "Logged out" });

    response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
    });

    return response;
}