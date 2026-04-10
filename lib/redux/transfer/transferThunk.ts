import { createAsyncThunk } from "@reduxjs/toolkit";

const createTransferThunk = createAsyncThunk(
    "transfer/create",
    async (
        payload: {
            uid: string,
            amount: number
        }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch("/api/transfer/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Transfer gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getTransferHistoryThunk = createAsyncThunk(
    "transfer/history",
    async (pagination: any, { rejectWithValue }
    ) => {
        try {
            const { page, limit, search, sort } = pagination;
            const res = await fetch(`/api/transfer/history?page=${page}&limit=${limit}&search=${search}&sort=${sort}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch history gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export {
    createTransferThunk,
    getTransferHistoryThunk,
}