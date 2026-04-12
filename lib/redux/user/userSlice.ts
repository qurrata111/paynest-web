import { createSlice } from "@reduxjs/toolkit";
import { getMyMenuThunk, updateUserThunk } from "./userThunk";

const initialState = {
    loading: false,
    error: null as any,
    updatedUser: null,
    menus: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUsersState: (state) => {
            state.loading = false;
            state.error = null;
            state.updatedUser = null;
            state.menus = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserThunk.pending, (state) => {
                state.updatedUser = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.updatedUser = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.updatedUser = null;
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
            .addCase(getMyMenuThunk.pending, (state) => {
                state.menus = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyMenuThunk.fulfilled, (state, action) => {
                state.menus = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getMyMenuThunk.rejected, (state, action) => {
                state.menus = [];
                state.loading = false;
                state.error = action.payload || "Terjadi kesalahan";
            })
    }
})

export const {
    resetUsersState,
} = userSlice.actions;

export default userSlice.reducer;