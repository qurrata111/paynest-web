import { createAsyncThunk } from "@reduxjs/toolkit";


const getUserThunk = createAsyncThunk(
    "admin/user",
    async (pagination: any, { rejectWithValue }
    ) => {
        try {
            const { page, limit, search, sort, is_frozen} = pagination;
            const res = await fetch(`/api/admin/user?page=${page}&limit=${limit}&search=${search}&sort=${sort}&is_frozen=${is_frozen}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch user gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export {
    getUserThunk,
}