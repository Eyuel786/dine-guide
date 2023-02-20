import { createSlice } from "@reduxjs/toolkit";


const initUser = {
    userId: null,
    username: null,
    email: null,
    image: null,
    token: null,
    tokenExpirationDate: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: { ...initUser },
        error: null
    },
    reducers: {
        loading: state => {
            state.loading = true;
            state.error = null;
        },
        login: (state, action) => {
            state.loading = false;
            state.user = { ...action.payload.user }
        },
        logout: state => {
            state.loading = false;
            state.user = { ...initUser };
        },
        error: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        }
    }
});

export const authActions = authSlice.actions;

export const sendRegisterRequest = personData => {
    return async dispatch => {
        try {
            dispatch(authActions.loading());

            const { username, email, image, password } = personData;

            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("image", image);
            formData.append("password", password);

            const response = await fetch(
                "http://127.0.0.1:9000/api/register",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok)
                throw new Error(`The server responded with 
                ${response.status}, ${response.statusText}`);

            const responseData = await response.json();
            dispatch(authActions.login({ user: responseData }));
            localStorage.setItem("dine-guide-app-user", JSON.stringify(responseData));

        } catch (err) {
            dispatch(authActions.error({ error: err.message }));
        }
    }
}

export const sendLoginRequest = userData => {
    return async dispatch => {
        try {
            dispatch(authActions.loading());

            const response = await fetch(
                "http://127.0.0.1:9000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                }
            );

            if (!response.ok) {
                throw new Error(`
                The server responded with ${response.status}, 
                ${response.statusText}`);
            }

            const responseData = await response.json();
            dispatch(authActions.login({ user: responseData }));
            localStorage.setItem("dine-guide-app-user", JSON.stringify(responseData));

        } catch (err) {
            dispatch(authActions.error({ error: err.message }));
        }
    }
}

export const makeLogoutRequest = () => {
    return dispatch => {
        dispatch(authActions.logout());
        localStorage.removeItem("dine-guide-app-user");
    }
}