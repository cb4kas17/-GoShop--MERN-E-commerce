import React from 'react';
import styles from './ordersPageContainer.module.css';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { useNavigate } from 'react-router-dom';
import { orderSliceActions } from '../../store/orderSlice';
import OrdersItem from './OrdersItem';
const OrdersPageContainer = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, message, orders } = props;
    if (status === 'pending') {
        return (
            <div className={styles.absolute}>
                {status === 'pending' && <LoadingSpinner />}
                {status === 'failed' && (
                    <Modal
                        message={message}
                        button="Okay"
                        onClose={() => {
                            dispatch(orderSliceActions.reset());
                        }}
                    />
                )}
            </div>
        );
    }
    return (
        <div className={styles.ordersContainer}>
            <h1 className={styles.ordersHeader}>MY ORDERS</h1>
            <form className={styles.ordersItemsTable}>
                {orders.length === 0 && status !== 'pending' ? (
                    <h2 className={styles.noItem}>No orders found</h2>
                ) : (
                    <>
                        <div className={styles.ordersTableHeaderContainer}>
                            <h2>Order ID</h2>
                            <h2>Amount</h2>
                            <h2>Date</h2>
                            <h2>Transaction ID</h2>
                            <h2>Status</h2>
                        </div>
                        {orders &&
                            orders.map((item) => {
                                return (
                                    <OrdersItem
                                        order={item}
                                        key={item._id}
                                        onSelect={() => {
                                            navigate(`/orders/${item._id}`);
                                        }}
                                    />
                                );
                            })}
                    </>
                )}
            </form>
        </div>
    );
};

export default OrdersPageContainer;
