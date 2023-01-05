import axios from 'axios';
import { orderSliceActions } from '../orderSlice';
import { clearCart } from './cartActions';
export const placeOrder = (token, totalAmount) => {
    return async (dispatch, getState) => {
        const currentUser = getState().user.user;
        const cartItemsInitial = getState().cart.cart;
        const cartItems = cartItemsInitial.map((item) => {
            return {
                _id: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            };
        });

        try {
            dispatch(orderSliceActions.setStatus('pending'));
            const res = await axios.post(
                `${process.env.REACT_APP_API}api/orders/placeOrder`,
                {
                    token,
                    totalAmount,
                    currentUser,
                    cartItems,
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );
            if (res.data.success) {
                dispatch(orderSliceActions.setStatus('success'));
                dispatch(orderSliceActions.setMessage('Order successfully placed'));
                dispatch(clearCart());
            } else {
                dispatch(orderSliceActions.setStatus('failed'));
                dispatch(orderSliceActions.setMessage('Order did not proceed'));
            }
        } catch (error) {
            dispatch(orderSliceActions.setStatus('failed'));
            dispatch(orderSliceActions.setMessage('You must login first before checking out'));
        }
    };
};

export const getOrdersByUserId = (userId) => {
    return async (dispatch, getState) => {
        const currentUser = getState().user.user;
        dispatch(orderSliceActions.setStatus('pending'));
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}api/orders`,
                {
                    userId: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );

            if (res.data.success) {
                dispatch(orderSliceActions.setOrders(res.data.orders));
                dispatch(orderSliceActions.setStatus(''));
            } else {
                dispatch(orderSliceActions.setStatus('failed'));
                dispatch(orderSliceActions.setMessage('Failed to get orders of this USER'));
            }
        } catch (error) {
            dispatch(orderSliceActions.setStatus('failed'));
            dispatch(orderSliceActions.setMessage("There's an error occured fetching orders"));
        }
    };
};
export const getAllOrders = () => {
    return async (dispatch, getState) => {
        const currentUser = getState().user.user;
        dispatch(orderSliceActions.setStatus('pending'));
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}api/orders`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });
            if (res.data.success) {
                dispatch(orderSliceActions.setOrders(res.data.orders));
                dispatch(orderSliceActions.setStatus('success'));
            } else {
                dispatch(orderSliceActions.setStatus('failed'));
                dispatch(orderSliceActions.setMessage('Failed to get orders'));
            }
        } catch (error) {
            dispatch(orderSliceActions.setStatus('failed'));
            dispatch(orderSliceActions.setMessage("There's an error occured fetching orders"));
        }
    };
};
