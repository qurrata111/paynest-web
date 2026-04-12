import { createAsyncThunk } from "@reduxjs/toolkit";


const getRoleThunk = createAsyncThunk(
    "role",
    async (pagination: any, { rejectWithValue }
    ) => {
        try {
            const { page, limit, sort, order, search } = pagination;
            const res = await fetch(`/api/role?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getRoleAllThunk = createAsyncThunk(
    "role/all",
    async (_, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/role/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);


const createRoleThunk = createAsyncThunk(
    "role/create",
    async (
        payload: {
            role_name: string,
            role_key: string,
            role_menus: any,
        }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch("/api/role/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Add role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const getOneRoleThunk = createAsyncThunk(
    "role/fetchById",
    async (id: any, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/role/${+id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fetch role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const updateRoleThunk = createAsyncThunk(
    "role/updateById",
    async (
        payload: {
            id: string,
            data: any,
        }, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/role/${payload.id}/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.data),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Add role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const deleteRoleThunk = createAsyncThunk(
    "role/deleteById",
    async (id: string, { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`/api/role/${id}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Delete role gagal");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);


export {
    getRoleThunk,
    getOneRoleThunk,
    getRoleAllThunk,
    createRoleThunk,
    updateRoleThunk,
    deleteRoleThunk,
}
