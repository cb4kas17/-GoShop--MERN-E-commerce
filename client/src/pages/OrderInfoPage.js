import React, { useEffect, useState } from 'react';
import OrderInfoPageContainer from '../components/OrdersPageComponents/OrderInfoPageContainer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderInfoPage = () => {
    const orderId = useParams().orderId;
    const [orderDetail, setOrderDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderInfo = async () => {
            setIsLoading(true);
            try {
                const res = await axios(`${process.env.REACT_APP_API}api/orders/${orderId}`);
                if (res.data.success) {
                    setOrderDetail(res.data.orderDetail);
                    setIsLoading(false);
                } else {
                    throw new Error('Order ID does not exist');
                }
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchOrderInfo();
    }, [orderId]);
    return (
        <div className="max-width">
            <OrderInfoPageContainer orderDetail={orderDetail} error={error} isLoading={isLoading} />
            ;
        </div>
    );
};
export default OrderInfoPage;
