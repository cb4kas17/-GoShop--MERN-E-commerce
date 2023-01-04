import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: { status: '', error: '', message: '' },
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
    },
});
export const reviewSliceActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
