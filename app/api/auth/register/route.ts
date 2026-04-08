import api from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const res = await api.post("/auth/register", body);
    const data = res.data;

     if (!data) {
        return Response.json({
            data: null,
            status: false,
            message: "Fail to get transfer history",
            statusCode: 500,
        });
    }

    return Response.json(data);
}