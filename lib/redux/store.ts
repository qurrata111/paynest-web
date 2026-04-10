import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import transferReducer from "./transfer/transferSlice";
import userAdminReducer from "./admin/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transfer: transferReducer,
    user: userAdminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;