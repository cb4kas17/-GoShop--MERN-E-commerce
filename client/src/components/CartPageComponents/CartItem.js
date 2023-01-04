import React, { useState } from 'react';
import styles from './cartItem.module.css';
import { useDispatch } from 'react-redux';
import { addToCart, reduceItemToCart, removeItemToCart } from '../../store/actions/cartActions';
const CartItem = (props) => {
    const dispatch = useDispatch();
    const { name, price, quantity, totalAmount, countInStock, _id } = props.cartItem;

    const [quantityInput, setQuantityInput] = useState(Number(quantity));

    const addToCartHandler = () => {
        setQuantityInput((prev) => {
            return prev + 1;
        });
        dispatch(
            addToCart({
                name: name,
                _id: _id,
                price: price,
                countInStock: countInStock,
                quantity: Number(quantityInput) + 1,
            })
        );
    };
    const removeToCartHandler = () => {
        setQuantityInput((prev) => {
            return prev - 1;
        });
        dispatch(reduceItemToCart(_id));
    };
    const deleteToCartHandler = () => {
        dispatch(removeItemToCart(_id));
    };
    return (
        <div className={styles.cartItemContainer}>
            <h3>{name}</h3>
            <h3>&#x20B1;{Number(price).toLocaleString()}</h3>
            <h3>&#x20B1;{Number(totalAmount).toLocaleString()}</h3>
            <h3 className={styles.controlsContainer}>
                <div className={styles.control}>
                    <i className="fa-regular fa-square-plus" onClick={addToCartHandler} />
                    <input
                        className={styles.quantityInput}
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="1"
                        max={countInStock}
                        value={quantityInput}
                        onChange={(e) => {
                            setQuantityInput(Number(e.target.value));
                        }}
                        onBlur={(e) => {
                            dispatch(
                                addToCart({
                                    name: name,
                                    _id: _id,
                                    price: price,
                                    countInStock: countInStock,
                                    quantity: Number(e.target.value),
                                })
                            );
                        }}
                    />
                    <i className="fa-regular fa-square-minus" onClick={removeToCartHandler} />
                </div>

                <i className="fa-solid fa-trash-can" onClick={deleteToCartHandler} />
            </h3>
        </div>
    );
};

export default CartItem;
