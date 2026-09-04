import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
//import reducer from "./cart-slice";

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

store.subscribe(() => {
    try {
        const cart = store.getState().cart;
        sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Failed to save state to sessionStorage:", error);
    }
});

export default store;