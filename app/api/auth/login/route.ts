import api from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const res = await api.post("/auth/login", body);
    const data = res.data;

    if (!data.status) {
        return NextResponse.json({ message: "Login gagal" }, { status: 401 });
    }

    const token = data.data.access_token;

    const response = NextResponse.json({
        user: data.data,
    });

    response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
    });

    return response;
}