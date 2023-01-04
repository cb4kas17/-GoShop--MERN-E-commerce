import React, { useEffect } from 'react';
import OrdersPageContainer from '../components/OrdersPageComponents/OrdersPageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByUserId } from '../store/actions/orderActions';
import { useNavigate } from 'react-router-dom';
const OrdersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, status, message } = useSelector((state) => state.order);
    const user = useSelector((state) => state.user.user);
  
    useEffect(() => {
        if (!user._id) {
            navigate('/login');
        } else {
            dispatch(getOrdersByUserId(user._id));
        }
    }, [dispatch, navigate, user._id]);
    return (
        <div className="max-width">
            <OrdersPageContainer orders={orders} status={status} message={message} />
        </div>
    );
};

export default OrdersPage;
