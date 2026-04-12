import { createAsyncThunk } from "@reduxjs/toolkit";

const updateUserThunk = createAsyncThunk(
    "user/me",
    async (payload: {
        name: string,
        email: string
    }, { rejectWithValue }
    ) => {
        try {

            const res = await fetch("/api/user/me", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update profile gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

const getMyMenuThunk = createAsyncThunk(
    "user/me/menu",
    async (_, { rejectWithValue }
    ) => {
        try {
            const res = await fetch("/api/user/me/menu", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Get user's menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

export {
    updateUserThunk,
    getMyMenuThunk,
}