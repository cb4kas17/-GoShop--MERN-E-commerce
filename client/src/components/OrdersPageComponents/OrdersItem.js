import React from 'react';
import styles from './ordersItem.module.css';
const OrdersItem = (props) => {
    const { _id, orderAmount, transactionId, isDelivered, createdAt } = props.order;
    return (
        <div
            className={styles.ordersItemContainer}
            onClick={() => {
                props.onSelect();
            }}
        >
            <h3>{_id}</h3>
            <h3>&#x20B1;{Number(orderAmount).toLocaleString()}</h3>
            <h3>{new Date(createdAt).toLocaleDateString()}</h3>
            <h3>{transactionId}</h3>
            <h3>{isDelivered ? 'Delivered' : 'Pending'}</h3>
        </div>
    );
};

export default OrdersItem;
