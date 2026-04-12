import api from "@/lib/api";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return Response.json({ user: null }, { status: 401 });
    }

    const res = await api.get(`/menu/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = res.data;

    if (!data) {
        return Response.json({
            data: null,
            status: false,
            message: "Fail to get menu",
            statusCode: 500,
        });
    }

    return Response.json(data);
}