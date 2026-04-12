import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import transferReducer from "./transfer/transferSlice";
import adminReducer from "./admin/adminSlice";
import menuReducer from "./menu/menuSlice";
import roleReducer from "./role/roleSlice";
import userReducer from "./user/userSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    transfer: transferReducer,
    admin: adminReducer,
    menu: menuReducer,
    role: roleReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;