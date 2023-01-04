import React from 'react';
import styles from './forgotPassword.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';

const ForgotPassword = () => {
    let validEmail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
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
            // const emailData = { email: emailValue };
            emailReset();
        }
    };
    return (
        <form className={styles.forgotPWPageContainer} onSubmit={onSubmitHandler}>
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
        </form>
    );
};

export default ForgotPassword;
