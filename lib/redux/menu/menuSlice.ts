import { createSlice } from "@reduxjs/toolkit";
import { createMenuThunk, deleteMenuThunk, getMenuAllMenuThunk, getMenuAllThunk, getMenuThunk, getOneMenuThunk, updateMenuThunk } from "./menuThunk";

const initialState = {
    loading: false,
    error: null as any,
    menus: [],
    pagination: {
        page: 1,
        limit: 5,
        total: 0,
        sort: "seq",
        order: "asc",
        search: "",
    },
    menu: null,
    menuAll: [],
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        resetMenusState: (state) => {
            state.menus = []
            state.loading = false;
            state.error = null;
            state.menu = null;
            state.menuAll = [];
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setPaginationSearch: (state, action) => {
            state.pagination.search = action.payload;
        },
        resetMenu: (state) => {
            state.loading = false;
            state.error = null;
            state.menu = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenuThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMenuThunk.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.loading = false;
                state.menus = data.data;
                state.pagination.total = data.total;
                state.pagination.page = data.page;
            })
            .addCase(getMenuThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(createMenuThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMenuThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createMenuThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOneMenuThunk.pending, (state) => {
                state.menu = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneMenuThunk.fulfilled, (state, action) => {
                state.menu = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getOneMenuThunk.rejected, (state, action) => {
                state.menu = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateMenuThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMenuThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateMenuThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMenuThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMenuThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteMenuThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMenuAllThunk.pending, (state) => {
                state.menuAll = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getMenuAllThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.menuAll = action.payload;
            })
            .addCase(getMenuAllThunk.rejected, (state, action) => {
                state.menuAll = [];
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(getMenuAllMenuThunk.pending, (state) => {
                // state.menuAll = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getMenuAllMenuThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.menuAll = action.payload;
            })
            .addCase(getMenuAllMenuThunk.rejected, (state, action) => {
                state.menuAll = [];
                state.loading = false;
                // state.error = action.payload || "Terjadi kesalahan";
            })
    }
})

export const {
    resetMenusState,
    setPage,
    setPaginationSearch,
    resetMenu,
} = menuSlice.actions;

export default menuSlice.reducer;