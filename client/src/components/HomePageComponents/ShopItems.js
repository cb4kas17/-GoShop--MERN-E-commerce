import React from 'react';
import styles from './shopItems.module.css';
import ShopItem from './ShopItem';

const ShopItems = (props) => {
    return (
        <div className={styles.productItemsContainer}>
            <ul className={styles.productList}>
                {props.products &&
                    props.products?.map((product) => {
                        return <ShopItem product={product} key={product._id} />;
                    })}
            </ul>
            {props.products.length === 0 && (
                <div className={styles.fallback}> There's no products available</div>
            )}
        </div>
    );
};

export default ShopItems;
