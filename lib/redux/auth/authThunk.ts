import api from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginThunk = createAsyncThunk(
    "auth/login",
    async (payload: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const registerThunk = createAsyncThunk(
    "auth/register",
    async (
        payload: {
            name: string,
            email: string;
            password: string
        }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Register gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getMeThunk = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/user/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Not authenticated");

            const data = await res.json();
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Logout gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export {
    loginThunk,
    getMeThunk,
    logoutThunk,
    registerThunk,
}