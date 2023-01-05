import React from 'react';
import { useSelector } from 'react-redux';

import ProfilePageContainer from '../components/ProfilePageComponents/ProfilePageContainer';
const ProfilePage = () => {
    const userInfo = useSelector((state) => state.user.user);

    return (
        <div className="max-width">
            <ProfilePageContainer userInfo={userInfo} />
        </div>
    );
};

export default ProfilePage;
