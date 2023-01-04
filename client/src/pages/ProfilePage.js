import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../store/actions/userActions';
import ProfilePageContainer from '../components/ProfilePageComponents/ProfilePageContainer';
const ProfilePage = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        dispatch(getUserDetails(user._id));
    }, [dispatch, user._id]);
    return (
        <div className="max-width">
            <ProfilePageContainer userInfo={userInfo} />
        </div>
    );
};

export default ProfilePage;
