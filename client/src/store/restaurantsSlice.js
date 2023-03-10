import { createSlice } from "@reduxjs/toolkit";


export const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: {
        loading: false,
        restaurants: [],
        error: null
    },
    reducers: {
        loading: state => {
            state.loading = true;
            state.error = null;
        },
        replace: (state, action) => {
            state.loading = false;
            state.error = null;
            state.restaurants = [...action.payload.restaurants];
        },
        add: (state, action) => {
            state.loading = false;
            state.error = null;
            state.restaurants.unshift({ ...action.payload.restaurant });
        },
        update: (state, action) => {
            state.loading = false;
            state.error = null;
            const index = state.restaurants.findIndex(r => r.id === action.payload.id);
            state.restaurants.splice(index, 1, { ...action.payload.restaurant });
        },
        remove: (state, action) => {
            state.loading = false;
            state.error = null;
            const index = state.restaurants.findIndex(r => r.id === action.payload.id);
            state.restaurants.splice(index, 1);
        },
        error: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        }
    }
});

export const restaurantsActions = restaurantsSlice.actions;
const url = "http://127.0.0.1:9000/api/restaurants";

export const fetchRestaurants = () => {
    return async dispatch => {
        try {

            dispatch(restaurantsActions.loading());

            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Error fetching restaurants");

            const responseData = await response.json();
            dispatch(restaurantsActions.replace({ restaurants: responseData }));

        } catch (err) {
            console.log("Error:", err.message);
            dispatch(restaurantsActions.error({ error: err.message }));
        }
    }
}

export const sendNewRestaurant = restaurant => {
    return async (dispatch, getState) => {
        try {
            dispatch(restaurantsActions.loading());

            const state = getState();
            const { token } = state.auth.user;

            const { name, type, image, location, website, description } = restaurant;

            const formData = new FormData();
            formData.append("name", name);
            formData.append("type", type);
            formData.append("image", image);
            formData.append("location", location);
            formData.append("website", website);
            formData.append("description", description);

            const response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    body: formData
                }
            );

            if (!response.ok)
                throw new Error("Error sending restaurant");

            const responseData = await response.json();
            dispatch(restaurantsActions.add({ restaurant: responseData }));
            return responseData;

        } catch (err) {
            dispatch(restaurantsActions.error({ error: err.message }));
            throw err;
        }
    }
}

export const sendUpdatedRestaurant = (id, restaurant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(restaurantsActions.loading());

            const state = getState();
            const { token } = state.auth.user;

            const { name, type, image, location, website, description } = restaurant;

            const formData = new FormData();
            formData.append("name", name);
            formData.append("type", type);
            formData.append("image", image);
            formData.append("location", location);
            formData.append("website", website);
            formData.append("description", description);

            const response = await fetch(
                `${url}/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    body: formData
                }
            );

            if (!response.ok)
                throw new Error("Error sending updated restaurant");

            const responseData = await response.json();
            dispatch(restaurantsActions.update({ id, restaurant: responseData }));
            return responseData;

        } catch (err) {
            dispatch(restaurantsActions.error({ error: err.message }));
            throw err;
        }
    }
}

export const removeRestaurantFromDB = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(restaurantsActions.loading());

            const state = getState();
            const { token } = state.auth.user;

            const response = await fetch(
                `${url}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (!response.ok)
                throw new Error("Error removing restaurant from DB");

            dispatch(restaurantsActions.remove({ id }));

        } catch (err) {
            console.log("Error:", err.message);
            dispatch(restaurantsActions.error({ error: err.message }));
        }
    }
}

export const sendReview = (id, review) => {
    return async (dispatch, getState) => {
        try {

            dispatch(restaurantsActions.loading());

            const state = getState();
            const { token } = state.auth.user;

            const response = await fetch(
                `${url}/${id}/reviews`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(review)
                }
            );

            if (!response.ok)
                throw new Error("Error sending review");

            const responseData = await response.json();
            dispatch(restaurantsActions.update({ id, restaurant: responseData }));
            return responseData;

        } catch (err) {
            console.log("Error:", err.message);
            dispatch(restaurantsActions.error({ error: err.message }));
            throw err;
        }
    }
}

export const removeReviewFromDB = (id, reviewId) => {
    return async (dispatch, getState) => {
        try {

            dispatch(restaurantsActions.loading());

            const state = getState();
            const { token } = state.auth.user;

            const response = await fetch(
                `${url}/${id}/reviews/${reviewId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (!response.ok)
                throw new Error("Error deleting review");

            const responseData = await response.json();
            dispatch(restaurantsActions.update({ id, restaurant: responseData }));
            return responseData;

        } catch (err) {
            console.log("Error:", err.message);
            dispatch(restaurantsActions.error({ error: err.message }));
            throw err;
        }
    }
}