import api from "@/lib/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
        return Response.json({ user: null }, { status: 401 });
    }

    const body = await req.json();
    const res = await api.post("/transfer", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = res.data;

    if (!data) {
        return Response.json({
            data: null,
            status: false,
            message: "Fail to transfer",
            statusCode: 500,
        });
    }

    return Response.json(data);
}