import { createSlice } from "@reduxjs/toolkit";


//const initialCart = JSON.parse(sessionStorage.getItem("cart.items")) || [];
//const initialCart = sessionStorage.getItem("cart");
//Array.isArray(parsed.items) ? parsed.items : [];
const storedCart = sessionStorage.getItem("cart");
const initialCart = storedCart ? JSON.parse(storedCart).items : [];
const totalQ = storedCart ? JSON.parse(storedCart).totalQuantity : 0;
const totalP = storedCart ? JSON.parse(storedCart).totalPrice : 0;


// Initial state for the cart
const initialState = {
  items: initialCart,
  totalQuantity: totalQ,
  totalPrice: totalP,
};

// cart slice
const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addToCart(state, action) {           
            const { id, name, price, itemImg, stockLevel } = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === id
            );
            if(existingItem){
                if(existingItem.stockLevel > 0){
                     const newItem = action.payload;
                    if (newItem.userSelectQuantity >0 && newItem.userSelectQuantity <=5) {
                        const itemQuantity = (action.payload.userSelectQuantity - existingItem.quantity);
                        existingItem.stockLevel = existingItem.stockLevel - itemQuantity;
                        existingItem.quantity = action.payload.userSelectQuantity;                        
                    } else {
                        existingItem.stockLevel--;
                        existingItem.quantity++;
                    }                
                }
            }else {
                let newItem = action.payload;
                newItem.stockLevel--;
                state.items.push({ ...newItem, quantity: 1});
            }
            // Update totals
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        increaseQty(state, action){
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === id
            );
            if(existingItem) {
                if(existingItem.stockLevel > 0){
                    existingItem.quantity++;
                    existingItem.stockLevel--;
                }
            }
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        decreaseQty(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === id
            );
            if(existingItem) {
                if(existingItem.quantity > 1){
                    existingItem.quantity--;
                    existingItem.stockLevel++;
                }
            }
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        removeProduct(state, action){           
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        
        clearBasket(state){
            state.items = [];            
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
    },
});
export const { addToCart, removeProduct, clearBasket, increaseQty, decreaseQty } = cartSlice.actions;

export default cartSlice.reducer;  //returns single reducer function with all the cart logic

// Selectors — these will always update when state changes
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalPrice = (state) => state.cart.totalPrice;

//export default cartSlice.reducer;



