import React from 'react';
import styles from './register.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../../store/actions/userActions';
import { userSliceActions } from '../../store/userSlice';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, message } = useSelector((state) => state.user);
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let validEmail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInput((input) => input.trim().length > 7 && input.includes(' '));
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput((input) => validEmail.test(input));
    // input.trim().length > 10 && input.includes('@') && input.includes('.')
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
    } = useInput((input) => input === passwordValue && input.trim().length > 0);
    const onRegisterHandler = (e) => {
        e.preventDefault();
        nameBlurHandler();
        emailBlurHandler();
        passwordBlurHandler();
        confirmPasswordBlurHandler();
        if (emailIsValid && nameIsValid && passwordIsValid && confirmPasswordIsValid) {
            const user = {
                name: nameValue,
                email: emailValue,
                password: passwordValue,
            };
            dispatch(registerNewUser(user));
            dispatch(userSliceActions.setStatus(''));

            if (status === 'failed') {
                nameReset();
                emailReset();
                passwordReset();
                confirmPasswordReset();
            }
        }
    };
    return (
        <form className={styles.registerPageContainer} onSubmit={onRegisterHandler}>
            {status === 'success' && (
                <Modal
                    onClose={() => {
                        navigate('/login');
                        dispatch(userSliceActions.setStatus(''));
                    }}
                    message={message}
                    button="Okay"
                />
            )}
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
                <Card className={styles.registerFieldContainer}>
                    <h1>Create an account and Shop with us</h1>
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
                    <Button className={styles.registerbtn} type="submit">
                        Register
                    </Button>
                </Card>
            )}
        </form>
    );
};

export default Register;
