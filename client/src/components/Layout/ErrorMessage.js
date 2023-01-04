import React from 'react';
import styles from './errorMessage.module.css';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
const ErrorMessage = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.errorMessage}>
                {props.errorMessage}
                <Button
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Go to home page
                </Button>
            </div>
        </>
    );
};

export default ErrorMessage;
