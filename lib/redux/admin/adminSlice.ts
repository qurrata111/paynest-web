import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk } from "./adminThunk";

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
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: (state) => {
            state.users = []
            state.loading = false;
            state.error = null;
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
    }
})

export const {
    resetState,
    setPage,
    setPaginationSearch,
    setPaginationIsFrozen,
} = userSlice.actions;

export default userSlice.reducer;