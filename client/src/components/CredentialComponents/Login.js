import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { loginUser } from '../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { userSliceActions } from '../../store/userSlice';

const Login = () => {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let validEmail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const dispatch = useDispatch();
    const { status, message } = useSelector((state) => state.user);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((input) => validEmail.test(input));

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useInput((input) => strongPassword.test(input));

    const onLoginHandler = (e) => {
        emailBlurHandler();
        passwordBlurHandler();
        e.preventDefault();
        if (emailIsValid && passwordIsValid) {
            const user = {
                email: emailValue,
                password: passwordValue,
            };
            dispatch(loginUser(user));
            passwordReset();
        }
    };

    return (
        <form className={styles.loginPageContainer} onSubmit={onLoginHandler}>
            {status === 'failed' && (
                <Modal
                    onClose={() => {
                        dispatch(userSliceActions.setStatus(''));
                    }}
                    message={message}
                    button="Close"
                />
            )}
            {status === 'pending' ? (
                <LoadingSpinner />
            ) : (
                <Card className={styles.loginFieldContainer}>
                    <h1>Welcome to GoShop! Please Login</h1>
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
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            className={passwordHasError ? styles.invalid : `${styles.inputItem}`}
                        />
                        <div className={styles.linkContainer}>
                            <Link to="/register" className={styles.forgotPassword}>
                                Create an account
                            </Link>
                            <Link to="/forgotPassword" className={styles.forgotPassword}>
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                    <Button className={styles.loginbtn} type="submit">
                        Login
                    </Button>
                </Card>
            )}
        </form>
    );
};

export default Login;
