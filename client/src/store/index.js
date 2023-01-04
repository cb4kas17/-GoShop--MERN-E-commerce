import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import productDetailReducer from './productDetailSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import reviewsReducer from './reviewsSlice';
import usersSliceReducer from './usersSlice';
const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetail: productDetailReducer,
        cart: cartReducer,
        user: userReducer,
        order: orderReducer,
        reviews: reviewsReducer,
        users: usersSliceReducer,
    },
});

export default store;
