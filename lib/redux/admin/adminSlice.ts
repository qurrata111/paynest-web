import { createSlice } from "@reduxjs/toolkit";
import { freezeWalletThunk, getUserByIdThunk, getUserThunk, topUpThunk, updateUserRoleThunk, updateUserThunk } from "./adminThunk";

const initialState = {
    loading: false,
    error: null as any,
    users: [],
    pagination: {
        page: 1,
        limit: 5,
        total: 0,
        sort: "created_at",
        order: "desc",
        search: "",
        is_frozen: ""
    },
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: (state) => {
            state.users = []
            state.loading = false;
            state.error = null;
            state.user = null;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setPaginationSearch: (state, action) => {
            state.pagination.search = action.payload;
        },
        setPaginationIsFrozen: (state, action) => {
            state.pagination.is_frozen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.loading = false;
                state.users = data.data;
                state.pagination.total = data.total;
                state.pagination.page = data.page;
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(getUserByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getUserByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(freezeWalletThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(freezeWalletThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(freezeWalletThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(updateUserRoleThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserRoleThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(topUpThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(topUpThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(topUpThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
    }
})

export const {
    resetState,
    setPage,
    setPaginationSearch,
    setPaginationIsFrozen,
} = userSlice.actions;

export default userSlice.reducer;