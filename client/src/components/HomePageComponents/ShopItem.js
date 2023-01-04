import React from 'react';
import styles from './shopItem.module.css';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import Rating from 'react-rating';
const ShopItem = (props) => {
    const { _id, name, image, rating, price } = props.product;
    const navigate = useNavigate();
    return (
        <li
            onClick={() => {
                navigate(`/product/${_id}`);
            }}
        >
            <Card className={styles.productItemContainer}>
                <img src={image} alt="Product IMG" className={styles.productImg} />
                <h1 className={styles.productName}>{name}</h1>
                <Rating
                    style={{ color: 'orange' }}
                    emptySymbol="fa-regular fa-star fa-3x"
                    fullSymbol="fa fa-star fa-3x"
                    initialRating={rating}
                    readonly={true}
                />

                <h1 className={styles.productPrice}> &#x20B1;{price}</h1>
            </Card>
        </li>
    );
};

export default ShopItem;
