import { configureStore } from "@reduxjs/toolkit";

import {
    authSlice,
    authActions,
    sendRegisterRequest,
    sendLoginRequest,
    makeLogoutRequest
} from "./authSlice";

import {
    restaurantsSlice,
    restaurantsActions,
    fetchRestaurants,
    sendNewRestaurant,
    sendUpdatedRestaurant,
    removeRestaurantFromDB,
    sendReview,
    removeReviewFromDB
} from "./restaurantsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        restaurants: restaurantsSlice.reducer
    }
});

export {
    authActions,
    sendRegisterRequest,
    sendLoginRequest,
    makeLogoutRequest
}

export {
    restaurantsActions,
    fetchRestaurants,
    sendNewRestaurant,
    sendUpdatedRestaurant,
    removeRestaurantFromDB,
    sendReview,
    removeReviewFromDB
}