import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './resetPassword.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useInput((input) => strongPassword.test(input));

    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: confirmPasswordReset,
    } = useInput((input) => input === passwordValue);

    useEffect(() => {
        const verifyLink = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    `${process.env.REACT_APP_API}api/user/verify-resetToken/${id}/${token}`
                );
                if (res.data) {
                    setIsLoading(false);
                }
            } catch (error) {
                setError(error.response.data.message);
                setIsLoading(false);
            }
        };
        verifyLink();
    }, [id, token]);
    const onSubmitHandler = (e) => {
        passwordBlurHandler();
        confirmPasswordBlurHandler();
        e.preventDefault();
        if (passwordIsValid && confirmPasswordIsValid) {
            const passwordData = { newPassword: passwordValue };
            const resetPassword = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.post(
                        `${process.env.REACT_APP_API}api/user/reset-password/${id}/${token}`,
                        passwordData
                    );
                    if (res.data) {
                        setIsSuccess(true);
                        setIsLoading(false);
                    }
                } catch (error) {
                    setError(error.response.data.message);
                    setIsLoading(false);
                }
            };

            resetPassword();
            passwordReset();
            confirmPasswordReset();
        }
    };
    return (
        <form className={styles.forgotPWPageContainer} onSubmit={onSubmitHandler}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Card className={styles.forgotPWFieldContainer}>
                    <h1>Enter your Password</h1>
                    <div className={styles.inputFields}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password (Must have special char and number)"
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            className={passwordHasError ? styles.invalid : `${styles.inputItem}`}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPasswordValue}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler}
                            className={
                                confirmPasswordHasError ? styles.invalid : `${styles.inputItem}`
                            }
                        />
                    </div>
                    <Button className={styles.forgotPWbtn} type="submit">
                        Send
                    </Button>
                </Card>
            )}
            {isSuccess && (
                <Modal
                    message="Password reset successful"
                    button="Okay"
                    onClose={() => {
                        setIsSuccess(false);
                        navigate('/login');
                    }}
                />
            )}
            {error && (
                <Modal
                    message={error}
                    button="Okay"
                    onClose={() => {
                        setError(null);
                    }}
                />
            )}
        </form>
    );
};

export default ResetPassword;
