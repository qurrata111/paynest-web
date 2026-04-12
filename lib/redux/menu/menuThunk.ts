import { createAsyncThunk } from "@reduxjs/toolkit";


const getMenuThunk = createAsyncThunk(
    "menu",
    async (pagination: any, { rejectWithValue }
    ) => {
        try {
            const { page, limit, sort, order, search } = pagination;
            const res = await fetch(`/api/menu?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getMenuAllThunk = createAsyncThunk(
    "menu/all",
    async (_, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/menu/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getMenuAllMenuThunk = createAsyncThunk(
    "menu/all/menu",
    async (_, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/menu/all/menu`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const createMenuThunk = createAsyncThunk(
    "menu/create",
    async (
        payload: {
            name: string,
            path: string,
            icon: string,
            seq: number,
            parent_id: number,
        }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch("/api/menu/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Add menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getOneMenuThunk = createAsyncThunk(
    "menu/fetchById",
    async (id: any, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/menu/${+id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const updateMenuThunk = createAsyncThunk(
    "menu/updateById",
    async (
        payload: {
            id: string,
            data: any,
        }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/menu/${payload.id}/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.data),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Add menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const deleteMenuThunk = createAsyncThunk(
    "menu/deleteById",
    async (id: string, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/menu/${id}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Delete menu gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);


export {
    getMenuThunk,
    getOneMenuThunk,
    getMenuAllThunk,
    getMenuAllMenuThunk,
    createMenuThunk,
    updateMenuThunk,
    deleteMenuThunk,
}
