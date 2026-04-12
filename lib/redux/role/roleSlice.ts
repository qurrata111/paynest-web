import { createSlice } from "@reduxjs/toolkit";
import { createRoleThunk, deleteRoleThunk, getRoleAllThunk, getRoleThunk, getOneRoleThunk, updateRoleThunk } from "./roleThunk";

const initialState = {
    loading: false,
    error: null as any,
    roles: [],
    pagination: {
        page: 1,
        limit: 5,
        total: 0,
        sort: "id",
        order: "asc",
        search: "",
    },
    role: null,
    roleAll: [],
}

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        resetRolesState: (state) => {
            state.roles = []
            state.loading = false;
            state.error = null;
            state.role = null;
            state.roleAll = [];
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setPaginationSearch: (state, action) => {
            state.pagination.search = action.payload;
        },
        resetRole: (state) => {
            state.loading = false;
            state.error = null;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoleThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoleThunk.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.loading = false;
                state.roles = data.data;
                state.pagination.total = data.total;
                state.pagination.page = data.page;
            })
            .addCase(getRoleThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(createRoleThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoleThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createRoleThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOneRoleThunk.pending, (state) => {
                state.role = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneRoleThunk.fulfilled, (state, action) => {
                state.role = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getOneRoleThunk.rejected, (state, action) => {
                state.role = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateRoleThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRoleThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateRoleThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteRoleThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRoleThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteRoleThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getRoleAllThunk.pending, (state) => {
                state.roleAll = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoleAllThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.roleAll = action.payload;
            })
            .addCase(getRoleAllThunk.rejected, (state, action) => {
                state.roleAll = [];
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
    }
})

export const {
    resetRolesState,
    setPage,
    setPaginationSearch,
    resetRole,
} = roleSlice.actions;

export default roleSlice.reducer;