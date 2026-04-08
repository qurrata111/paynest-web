import { createSlice } from "@reduxjs/toolkit"
import { createTransferThunk, getTransferHistoryThunk } from "./transferThunk";

const initialState = {
    loading: false,
    error: null as any,
    transfers: [],
    pagination: {
        page: 1,
        limit: 5,
        total: 0,
        sort: "created_at",
        order: "desc",
        search: "",
    },
    created: null as any,
}

const transferSlice = createSlice({
    name: "transfer",
    initialState,
    reducers: {
        resetTransferState: (state) => {
            state.transfers = []
            state.loading = false;
            state.error = null;
            state.created = null;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransferThunk.pending, (state) => {
                state.created = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransferThunk.fulfilled, (state, action) => {
                state.created = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(createTransferThunk.rejected, (state, action) => {
                state.created = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTransferHistoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransferHistoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.transfers = action.payload.data;
                state.pagination.total = action.payload.total;
            })
            .addCase(getTransferHistoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
    }
})

export const {
    resetTransferState,
    setPage,
} = transferSlice.actions;

export default transferSlice.reducer;