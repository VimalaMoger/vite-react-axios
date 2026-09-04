/* // React Context API
import React, { createContext, useContext, useReducer } from "react";
import { CartReducer } from "./cartReducer";


export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

//SessionStorage to store within browser
const StorageGetCart  = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
const StorageGetCount  = sessionStorage.getItem('count') ? JSON.parse(sessionStorage.getItem('count')) : 0;
const StorageGetTotal  = sessionStorage.getItem('total') ? JSON.parse(sessionStorage.getItem('total')) : 0;

const initialState = { cartItems: StorageGetCart, cartCount: StorageGetCount, cartTotal: StorageGetTotal };

const CartContextProvider = ({children}) => {
    //debugger;
    const [state, dispatch] = useReducer(CartReducer, initialState);
  
    const addProduct = payload => {
        dispatch({ type: 'ADD', payload });
        return state.cartItems;
    }
    
    const removeProduct = payload => {
        dispatch({ type: 'REMOVE', payload });
        return state.cartItems;
    }

    const increaseQty = payload => {
        dispatch({ type: 'INCREASEQTY', payload });
        return state.cartItems;
    }

    const decreaseQty = payload => {
        dispatch({ type: 'DECREASEQTY', payload });
        return state.cartItems;
    }
    
    const clearBasket = () => {
        dispatch({ type: 'CLEAR', payload : undefined });
        return state.cartItems;
    }

    const getCartItems =() => {
        return state.cartItems;
    }

    const getCartCount =() => {
        return state.cartCount;
    }

    const getCartTotal =() => {
        return state.cartTotal;
    }

    const contextValues = {      //expose these methods to Provider
        addProduct, removeProduct, increaseQty, decreaseQty, clearBasket, getCartItems, getCartCount, getCartTotal, 
        ...state
    }

    return(
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    );
};


export default CartContextProvider; */