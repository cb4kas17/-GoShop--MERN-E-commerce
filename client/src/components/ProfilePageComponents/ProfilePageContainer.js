import React from 'react';
import styles from './profilePageContainer.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/actions/userActions';
import { userSliceActions } from '../../store/userSlice';
const ProfilePageContainer = (props) => {
    const dispatch = useDispatch();
    const { status, message, user } = useSelector((state) => state.user);

    let validEmail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const { name, email } = props.userInfo;
    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInput((input) => input.trim().length > 7 && input.includes(' '), name);
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput((input) => validEmail.test(input), email);

    const onRegisterHandler = (e) => {
        e.preventDefault();
        nameBlurHandler();
        emailBlurHandler();

        if (emailIsValid && nameIsValid) {
            const updatedUserDetails = {
                name: nameValue,
                email: emailValue,
            };
            dispatch(updateProfile(updatedUserDetails, user._id));

            if (status === 'failed') {
                nameReset();
                emailReset();
            }
        }
    };
    return (
        <form className={styles.profilePageContainer} onSubmit={onRegisterHandler}>
            {status === 'pending' ? (
                <LoadingSpinner />
            ) : (
                <Card className={styles.profileFieldContainer}>
                    <h1>Edit Your Profile</h1>
                    {message === 'User details successfully updated' && (
                        <Modal
                            message={message}
                            button="okay"
                            onClose={() => {
                                dispatch(userSliceActions.setMessage(''));
                            }}
                        />
                    )}
                    <div className={styles.inputFields}>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full name"
                            value={nameValue}
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            className={nameHasError ? styles.invalid : `${styles.inputItem}`}
                        />
                        <input
                            type="email"
                            name="email"
                            id="emaail"
                            placeholder="Email address"
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            className={emailHasError ? styles.invalid : `${styles.inputItem}`}
                        />
                        <Button className={styles.profilebtn} type="submit">
                            Update
                        </Button>
                    </div>

                    <Link
                        className={styles.profilebtn}
                        style={{ textDecoration: 'underline', fontWeight: '400' }}
                        to="/"
                    >
                        Change Password
                    </Link>
                </Card>
            )}
        </form>
    );
};

export default ProfilePageContainer;
