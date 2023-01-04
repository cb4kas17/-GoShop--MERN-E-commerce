import axios from 'axios';
import { reviewSliceActions } from '../reviewsSlice';
// export const getAllReviewsByProductId = (productId) => {
//     return async (dispatch) => {
//         dispatch(reviewSliceActions.setStatus('pending'));
//         try {
//             const res = await axios(`${process.env.REACT_APP_API}api/reviews/${productId}`);
//             if (res.data.success) {
//                 dispatch(reviewSliceActions.setStatus('success'));
//             } else {
//                 dispatch(reviewSliceActions.setError(res.data.message));
//                 dispatch(reviewSliceActions.setStatus('failed'));
//             }
//         } catch (error) {
//             dispatch(
//                 reviewSliceActions.setError("There's an error fetching reviews of the product")
//             );
//             dispatch(reviewSliceActions.setStatus('failed'));
//         }
//     };
// };
export const submitReview = (reviewDetails, productId) => {
    return async (dispatch, getState) => {
        const user = getState().user.user;
        dispatch(reviewSliceActions.setStatus('pending'));
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/reviews`, {
                ...reviewDetails,
                userId: user._id,
                productId: productId,
                name: user.name,
            });
            if (res.data.success) {
                dispatch(reviewSliceActions.setStatus('success'));
                dispatch(reviewSliceActions.setMessage(res.data.message));
            } else {
                dispatch(reviewSliceActions.setError(res.data.message));
                dispatch(reviewSliceActions.setStatus('failed'));
            }
        } catch (error) {
            dispatch(
                reviewSliceActions.setError("There's an error fetching reviews of the product")
            );
            dispatch(reviewSliceActions.setStatus('failed'));
            dispatch(reviewSliceActions.setMessage('login first'));
        }
    };
};
