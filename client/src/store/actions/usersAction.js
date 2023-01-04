import axios from 'axios';
import { usersSliceAction } from '../usersSlice';
export const getUsers = () => {
    return async (dispatch) => {
        dispatch(usersSliceAction.setStatus('pending'));
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}api/user`);
            if (res.data.success) {
                dispatch(usersSliceAction.addUsers(res.data.users));
                dispatch(usersSliceAction.setStatus('success'));
                dispatch(usersSliceAction.setMessage('Users fetched successfully'));
            } else {
                dispatch(usersSliceAction.setStatus('failed'));
                dispatch(usersSliceAction.setMessage('Cannot fetch users'));
            }
        } catch (error) {
            dispatch(usersSliceAction.setStatus('failed'));
            dispatch(usersSliceAction.setMessage('There is an error fetching users'));
        }
    };
};
export const deleteUserById = (id) => {
    return async (dispatch) => {
        dispatch(usersSliceAction.setStatus('pending'));
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}api/user/${id}`);
            if (res.data.success) {
                dispatch(usersSliceAction.setStatus('success'));
                dispatch(usersSliceAction.setMessage(res.data.message));
            } else {
                dispatch(usersSliceAction.setStatus('failed'));
                dispatch(usersSliceAction.setMessage(res.data.message));
            }
        } catch (error) {
            dispatch(usersSliceAction.setStatus('failed'));
            dispatch(usersSliceAction.setMessage(error.message));
        }
    };
};
