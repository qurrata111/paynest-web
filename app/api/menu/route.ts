import api from "@/lib/api";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return Response.json({ user: null }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const sort = searchParams.get("sort") || "seq";
    const order = searchParams.get("order") || "asc";
    const search = searchParams.get("search") || "";


    const res = await api.get(`/menu?page=${page}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`, {
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