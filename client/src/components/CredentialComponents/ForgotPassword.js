import React, { useState } from 'react';
import axios from 'axios';
import styles from './forgotPassword.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
const ForgotPassword = () => {
    let validEmail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput((input) => validEmail.test(input));

    const onSubmitHandler = (e) => {
        e.preventDefault();
        emailBlurHandler();
        if (emailIsValid) {
            const emailData = { email: emailValue };
            const forgotPassword = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.post(
                        `${process.env.REACT_APP_API}api/user/forgot-password`,
                        emailData
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

            forgotPassword();
            emailReset();
        }
    };
    return (
        <form className={styles.forgotPWPageContainer} onSubmit={onSubmitHandler}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Card className={styles.forgotPWFieldContainer}>
                    <h1>Enter your email address</h1>
                    <div className={styles.inputFields}>
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
                    </div>
                    <Button className={styles.forgotPWbtn} type="submit">
                        Send
                    </Button>
                </Card>
            )}
            {isSuccess && (
                <Modal
                    message="Check your email for reset password link"
                    button="Okay"
                    onClose={() => {
                        setIsSuccess(false);
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

export default ForgotPassword;
