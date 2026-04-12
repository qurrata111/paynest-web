import api from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const body = await req.json();
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return Response.json({ user: null }, { status: 401 });
    }

    const payload = {
        name: body.name
    }

    const res = await api.post("/user/me/profile", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = res.data;

    if (!data) {
        return Response.json({
            data: null,
            status: false,
            message: "Fail to get user",
            statusCode: 500,
        });
    }

    return Response.json(data);
}