import React, { useEffect, useState } from 'react';
import styles from './ordersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../store/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

const OrdersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, status } = useSelector((state) => state.order);
    const [search, setSearch] = useState('');
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    let filteredArray = orders?.filter(
        (item) => item._id.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
    );
    const searchHandler = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className={styles.usersListContainer}>
            <h1 className={styles.header}>Orders List</h1>
            <div className={styles.filterContainer}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    onChange={searchHandler}
                    placeholder="Search OrderID"
                />
            </div>
            {status === 'pending' ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={styles.usersListContentContainer}>
                        <div className={styles.usersTableHeaderContainer}>
                            <h2>OrderID</h2>
                            <h2>Email</h2>
                            <h2>UserID</h2>
                            <h2>Amount</h2>
                            <h2>Date</h2>
                            <h2>TransactionID</h2>
                        </div>
                        {filteredArray.length === 0 && status === 'success' ? (
                            <h2 className={styles.noItem}>No orders found</h2>
                        ) : (
                            <>
                                {filteredArray?.map((item) => (
                                    <div
                                        className={styles.userContainer}
                                        key={item._id}
                                        onClick={() => {
                                            navigate(`/orders/${item._id}`);
                                        }}
                                    >
                                        <h3>{item._id}</h3>
                                        <h3>{item.email}</h3>
                                        <h3>{item.userId}</h3>
                                        <h3>&#8369;{Number(item.orderAmount).toLocaleString()}</h3>
                                        <h3>{new Date(item.createdAt).toLocaleDateString()}</h3>
                                        <h3>{item.transactionId}</h3>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default OrdersList;
