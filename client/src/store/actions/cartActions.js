import { cartSliceActions } from '../cartSlice';

export const addToCart = (product) => {
    return async (dispatch, getState) => {
        dispatch(cartSliceActions.addItemToCart(product));
        localStorage.setItem('cartInfo', JSON.stringify(getState().cart));
    };
};

export const reduceItemToCart = (productId) => {
    return async (dispatch, getState) => {
        dispatch(cartSliceActions.removeItemToCart(productId));
        localStorage.setItem('cartInfo', JSON.stringify(getState().cart));
    };
};
export const removeItemToCart = (productId) => {
    return async (dispatch, getState) => {
        dispatch(cartSliceActions.deleteItemToCart(productId));
        localStorage.setItem('cartInfo', JSON.stringify(getState().cart));
    };
};
