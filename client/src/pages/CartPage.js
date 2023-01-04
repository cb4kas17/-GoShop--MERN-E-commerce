import React from 'react';
import { useSelector } from 'react-redux';
import CartPageContainer from '../components/CartPageComponents/CartPageContainer';
const CartPage = () => {
    const { cart, totalItems, totalAmount } = useSelector((state) => state.cart);

    return (
        <div className="max-width">
            <CartPageContainer cart={cart} totalItems={totalItems} totalAmount={totalAmount} />
        </div>
    );
};

export default CartPage;
