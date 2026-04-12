import api from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return Response.json({ user: null }, { status: 401 });
        }

        const res = await api.delete(`/role/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = res.data;

        if (!data) {
            return Response.json({
                data: null,
                status: false,
                message: "Fail to delete role",
                statusCode: 500,
            });
        }

        return Response.json(data);
    } catch (error: any) {
        return Response.json({
            data: error.response.data || null,
            status: false,
            message: error.message ?? "Fail to delete role",
            statusCode: error.response.code || 500,
        });
    }
}