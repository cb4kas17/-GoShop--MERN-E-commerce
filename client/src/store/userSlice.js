import { createSlice } from '@reduxjs/toolkit';
const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));

const userSlice = createSlice({
    name: 'user',
    initialState: { user: userFromLocalStorage || {}, status: '', message: '' },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },

        setMessage(state, action) {
            state.message = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        logout(state) {
            state.user = {};
            state.message = '';
            state.status = '';
        },
    },
});
export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
