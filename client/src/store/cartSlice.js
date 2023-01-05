import { createSlice } from '@reduxjs/toolkit';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartInfo'));

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartFromLocalStorage || { cart: [], totalItems: 0, totalAmount: 0 },
    reducers: {
        clearCart(state) {
            state.cart = [];
            state.totalItems = 0;
            state.totalAmount = 0;
        },
        addItemToCart(state, action) {
            const itemFound = state.cart.find((item) => item._id === action.payload._id);
            if (itemFound) {
                itemFound.quantity = Number(action.payload.quantity);
                itemFound.totalAmount =
                    Number(action.payload.quantity) * Number(action.payload.price);
                if (itemFound.quantity === 0) {
                    const newCart = state.cart.filter((item) => item._id !== action.payload._id);
                    state.cart = newCart;
                }
            } else {
                state.cart.push({
                    ...action.payload,
                    totalAmount: action.payload.quantity * action.payload.price,
                });
            }

            state.totalItems = state.cart.reduce((initial, item) => {
                return initial + item.quantity;
            }, 0);
            state.totalAmount = state.cart.reduce((initial, item) => {
                return initial + item.quantity * item.price;
            }, 0);
        },
        removeItemToCart(state, action) {
            const itemFound = state.cart.find((item) => item._id === action.payload);
            state.totalItems--;
            state.totalAmount -= itemFound.price;

            if (itemFound.quantity !== 1) {
                itemFound.quantity--;
                itemFound.totalAmount -= itemFound.price;
            } else {
                const newCart = state.cart.filter((item) => item._id !== action.payload);
                state.cart = newCart;
            }
        },
        deleteItemToCart(state, action) {
            const newCart = state.cart.filter((item) => item._id !== action.payload);
            state.cart = newCart;
            state.totalItems = state.cart.reduce((initial, item) => {
                return initial + item.quantity;
            }, 0);
            state.totalAmount = state.cart.reduce((initial, item) => {
                return initial + item.quantity * item.price;
            }, 0);
        },
        resetCart(state) {
            state.cart = [];
            state.totalItems = 0;
            state.totalAmount = 0;
        },
    },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
