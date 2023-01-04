import React from 'react';
import styles from './orderInfoPageContainer.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
const OrderInfoPageContainer = (props) => {
    const {
        orderItems,
        _id,
        orderAmount,
        createdAt,
        transactionId,
        isDelivered,
        name,
        shippingAddress,
    } = props.orderDetail;
    const { isLoading } = props;
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className={styles.orderInfoContainer}>
                <div className={styles.leftContentContainer}>
                    <h2>Order Items</h2>
                    <div className={styles.orderItemsContainer}>
                        {orderItems &&
                            orderItems?.map((item) => {
                                return (
                                    <div className={styles.orderItemContainer} key={item._id}>
                                        <h3>{item.name}</h3>
                                        <h3>Quantity: {item.quantity}</h3>
                                        <h3>
                                            Price: {item.quantity}*{item.price} = &#8369;
                                            {Number(item.price * item.quantity).toLocaleString()}
                                        </h3>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={styles.rightContentContainer}>
                    <div className={styles.orderDetailsContainer}>
                        <h2>Order Details</h2>
                        <div className={styles.orderDetailsContentContainer}>
                            <h3>Order ID: {_id}</h3>
                            <h3>Total amount: &#x20B1;{Number(orderAmount).toLocaleString()}</h3>
                            <h3>
                                Date of order:{' '}
                                {createdAt && new Date(createdAt).toLocaleDateString()}
                            </h3>
                            <h3>Transaction ID: {transactionId}</h3>
                            <h3>Order status: {isDelivered ? 'Delivered' : 'Pending'}</h3>
                        </div>
                    </div>
                    <div className={styles.shippingDetailsContainer}>
                        <h2>Shipping Details</h2>
                        <div className={styles.shippingDetailsContentContainer}>
                            <h3>Name: {name}</h3>
                            <h3>Pincode: {shippingAddress && shippingAddress?.postalCode}</h3>
                            <h3>
                                Address: {shippingAddress && shippingAddress?.address},
                                {shippingAddress && shippingAddress?.city},
                                {shippingAddress && shippingAddress?.country}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.returnPolicyContainer}>
                <h2>RETURN POLICY</h2>
                <p>
                    We want you to be completely satisfied with your purchase. If for any reason you
                    are not satisfied, you may return the item(s) within 30 days of the purchase
                    date for a full refund of the purchase price, minus the shipping and handling
                    fees.
                </p>
                <p>
                    To be eligible for a return, the item(s) must be in the same condition that you
                    received it, unworn or unused, with tags, and in its original packaging. You
                    will be responsible for paying the shipping costs for returning the item(s).
                </p>
                <p>
                    If you receive an item that is damaged or defective, we will replace the item at
                    no cost to you. Please contact us within 7 days of receiving the damaged or
                    defective item to request a replacement.
                </p>
                <h3>EXCEPTIONS</h3>
                <p>The following items are not eligible for returns or exchanges:</p>

                <p>Custom or personalized orders</p>
                <p>Final sale items (items marked as "final sale" at the time of purchase)</p>

                <h3>PROCESS</h3>
                <p>
                    To initiate a return, please email us at [insert company email] with your order
                    number and the item(s) you would like to return. We will then provide you with a
                    return shipping address and a return authorization number. Please include this
                    number with your returned item(s).
                </p>
                <h3>REFUNDS</h3>
                <p>
                    Once we receive the returned item(s), we will inspect them to ensure they meet
                    the above requirements. If the return is approved, we will process the refund
                    within 7 business days. The refund will be issued to the original form of
                    payment.
                </p>
                <p>
                    Please note that it may take some time for the refund to be reflected on your
                    account or credit card statement, as it may take additional time for the
                    financial institution to process the refund.
                </p>
                <p>
                    This return policy applies to all purchases made through our website. If you
                    have any questions about our return policy, please don't hesitate to contact us.
                </p>
            </div>
        </>
    );
};

export default OrderInfoPageContainer;
