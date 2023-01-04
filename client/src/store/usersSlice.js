import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [], status: '', message: '' },
    reducers: {
        addUsers(state, action) {
            state.users = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
    },
});

export const usersSliceAction = usersSlice.actions;
export default usersSlice.reducer;
