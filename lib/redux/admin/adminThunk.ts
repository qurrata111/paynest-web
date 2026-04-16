import { createAsyncThunk } from "@reduxjs/toolkit";


const getUserThunk = createAsyncThunk(
    "admin/user",
    async (pagination: any, { rejectWithValue }
    ) => {
        try {
            const { page, limit, search, sort, is_frozen } = pagination;
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

const getUserByIdThunk = createAsyncThunk(
    "admin/user/fetchById",
    async (id: string, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/admin/user/${id}`, {
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

const updateUserThunk = createAsyncThunk(
    "admin/user/update",
    async (payload: {
        id: string,
        data: string
    }, { rejectWithValue }
    ) => {
        try {

            const res = await fetch(`/api/admin/user/${payload.id}/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.data),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update user gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

const freezeWalletThunk = createAsyncThunk(
    "admin/user/freeze",
    async (payload: {
        id: number,
        type: number
    }, { rejectWithValue }
    ) => {
        try {

            const res = await fetch(`/api/admin/user/${payload.id}/freeze`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
             
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Freeze gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

const updateUserRoleThunk = createAsyncThunk(
    "admin/user/role",
    async (payload: {
        id: number,
        data: number
    }, { rejectWithValue }
    ) => {
        try {

            const res = await fetch(`/api/admin/user/${payload.id}/role`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.data),
             
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

const topUpThunk = createAsyncThunk(
    "admin/user/topup",
    async (payload: {
        user_id: number,
        amount: number
    }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/admin/user/${payload.user_id}/topup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
             
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Topup gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

export {
    getUserThunk,
    getUserByIdThunk,
    updateUserThunk,
    freezeWalletThunk,
    updateUserRoleThunk,
    topUpThunk,
}