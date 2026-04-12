import api from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return Response.json({ user: null }, { status: 401 });
        }

        const body = await req.json();
        const res = await api.post("/role", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = res.data;

        if (!data) {
            return Response.json({
                data: null,
                status: false,
                message: "Fail to add role",
                statusCode: 500,
            });
        }

        return Response.json(data);
    } catch (error: any) {
        console.log(error.response.data)
        return Response.json({
            data: null,
            status: false,
            message: error.message ?? "Fail to add role",
            statusCode: 500,
        });
    }
}