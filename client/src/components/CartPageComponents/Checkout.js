import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Button from '../UI/Button';
import styles from './checkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../store/actions/orderActions';
import { useNavigate } from 'react-router-dom';
const Checkout = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.user._id);
    const tokenHandler = (token) => {
        dispatch(placeOrder(token, props.totalAmount));
    };

    return (
        <div>
            {userId ? (
                <StripeCheckout
                    amount={props.totalAmount * 100}
                    token={tokenHandler}
                    currency="PHP"
                    shippingAddress
                    billingAddress
                    stripeKey="pk_test_51MKQ2XBLvHNP8gpaEQSenMwvh0nkqAZvI6I72TmBwz4HlTbUMfbG8J32ynE7nrjo1Gs53g4nywm8BfXfTQVvovEQ006NqaqHg5"
                >
                    <Button className={styles.checkout} type="submit">
                        Check Out
                    </Button>
                </StripeCheckout>
            ) : (
                <Button
                    className={styles.checkout}
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Login
                </Button>
            )}
        </div>
    );
};

export default Checkout;
