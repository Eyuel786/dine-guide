import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { authActions, makeLogoutRequest } from "../store";


export function useAuthState(user) {
    const dispatch = useDispatch();
    const logoutTimer = useRef();

    const autoLogin = useCallback(() => {
        try {
            if (!user?.token) {
                const userData = JSON.parse(localStorage.getItem("dine-guide-app-user"));

                if (userData &&
                    userData.token &&
                    new Date(userData.tokenExpirationDate) > new Date()) {
                    dispatch(authActions.login({ user: userData }));
                }
            }
        } catch (err) {
            console.log("Error:", err.message);
        }
    }, [user, dispatch]);

    const autoLogout = useCallback(() => {
        try {
            if (user?.token) {

                const tokenExpirationDuration =
                    new Date(user.tokenExpirationDate).getTime() - new Date().getTime();

                logoutTimer.current = setTimeout(() => {
                    dispatch(makeLogoutRequest());
                }, tokenExpirationDuration);
            } else {
                clearTimeout(logoutTimer.current);
            }

        } catch (err) {
            console.log("Error:", err.message);
        }
    }, [user, dispatch]);

    useEffect(() => {
        autoLogin();
    }, [autoLogin]);

    useEffect(() => {
        autoLogout();
    }, [autoLogout]);
}

