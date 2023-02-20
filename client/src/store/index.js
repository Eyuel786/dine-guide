import { configureStore } from "@reduxjs/toolkit";

import {
    authSlice,
    authActions,
    sendRegisterRequest,
    sendLoginRequest,
    makeLogoutRequest
} from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export {
    authActions,
    sendRegisterRequest,
    sendLoginRequest,
    makeLogoutRequest
}