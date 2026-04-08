import api from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return Response.json({ user: null }, { status: 401 });
    }

    const res = await api.get("/user/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = res.data;

    return Response.json({
        user: data.data,
    });
}