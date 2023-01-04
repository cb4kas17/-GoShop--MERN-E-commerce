import React from 'react';
import styles from './cartPageContainer.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { useNavigate } from 'react-router-dom';

import { orderSliceActions } from '../../store/orderSlice';
const CartPageContainer = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, message } = useSelector((state) => state.order);
    const onCheckOutHandler = (e) => {
        e.preventDefault();
    };
    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.cartHeader}>MY CART</h1>
            <form className={styles.cartItemsTable} onSubmit={onCheckOutHandler}>
                {status !== '' && (
                    <div className={styles.absolute}>
                        {status === 'pending' && <LoadingSpinner />}
                        {status === 'success' && (
                            <Modal
                                message={message}
                                button="Okay"
                                onClose={() => {
                                    navigate('/orders');
                                    dispatch(orderSliceActions.reset());
                                }}
                            />
                        )}
                    </div>
                )}

                {props.cart.length === 0 ? (
                    <h2 className={styles.noItem}>No items in cart</h2>
                ) : (
                    <>
                        <div className={styles.cartTableHeaderContainer}>
                            <h2>Name</h2>
                            <h2>Price</h2>
                            <h2>Total</h2>
                            <h2>Quantity</h2>
                        </div>
                        {props.cart &&
                            props.cart?.map((item) => {
                                return <CartItem cartItem={item} key={item._id} />;
                            })}
                        <div className={styles.totalContainer}>
                            <h2>
                                Sub Amount: &#x20B1;{Number(props.totalAmount).toLocaleString()}
                            </h2>
                        </div>
                        <div className="payContainer">
                            <Checkout totalAmount={props.totalAmount} />
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default CartPageContainer;
