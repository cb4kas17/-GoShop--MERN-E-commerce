import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: { status: '', message: '', orders: [] },
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
        setOrders(state, action) {
            state.orders = action.payload;
        },
        reset(state) {
            state.status = '';
            state.message = '';
        },
    },
});
export const orderSliceActions = orderSlice.actions;
export default orderSlice.reducer;
