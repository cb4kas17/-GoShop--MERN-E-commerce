import { createSlice } from '@reduxjs/toolkit';
const productDetailSlice = createSlice({
    name: 'product',
    initialState: { productDetail: {}, isLoading: false, error: '' },
    reducers: {
        setProduct(state, action) {
            state.productDetail = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = !!action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});
export const productDetailActions = productDetailSlice.actions;
export default productDetailSlice.reducer;
