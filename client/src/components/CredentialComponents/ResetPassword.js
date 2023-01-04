import React from 'react';
import styles from './resetPassword.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
const ResetPassword = () => {
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

    const onSubmitHandler = (e) => {
        passwordBlurHandler();
        confirmPasswordBlurHandler();
        e.preventDefault();
        if (passwordIsValid && confirmPasswordIsValid) {
            // const passwordData = { password: passwordValue };

            passwordReset();
            confirmPasswordReset();
        }
    };
    return (
        <form className={styles.forgotPWPageContainer} onSubmit={onSubmitHandler}>
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
                        className={confirmPasswordHasError ? styles.invalid : `${styles.inputItem}`}
                    />
                </div>
                <Button className={styles.forgotPWbtn} type="submit">
                    Send
                </Button>
            </Card>
        </form>
    );
};

export default ResetPassword;
