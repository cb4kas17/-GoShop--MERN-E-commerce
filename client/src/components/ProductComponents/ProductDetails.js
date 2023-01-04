import React, { useState, useEffect } from 'react';
import styles from './productDetails.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import WriteReview from './WriteReview';
import Reviews from './Reviews';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import Rating from 'react-rating';

const ProductDetails = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    // const { reviews, status } = useSelector((state) => state.reviews);

    const [quantity, setQuantity] = useState('1');
    const [outOfStock, setOutOfStock] = useState(false);
    const { product, reviews } = props;

    const itemInCart = cartItems.find((item) => item._id === product._id);

    // effect if the stock is already 0
    useEffect(() => {
        if (!Number(product?.countInStock)) {
            setOutOfStock(true);
        }
    }, [product.countInStock]);
    // effect if i add to cart many times when there's a limited stocks
    useEffect(() => {
        if (itemInCart?.quantity > 0) {
            if (itemInCart?.quantity + 1 > Number(product?.countInStock)) {
                setOutOfStock(true);
            }
        }
    }, [itemInCart?.quantity, product?.countInStock]);

    const onAddToCardHandler = (e) => {
        e.preventDefault();
        dispatch(
            addToCart({
                name: product.name,
                _id: product._id,
                price: product.price,
                countInStock: product.countInStock,
                quantity: Number(quantity),
            })
        );
        navigate('/');
    };
    return (
        <div className={styles.productDetailsContainer}>
            <Card className={styles.firstDivContainer}>
                <h1 className={styles.productName}>{product.name}</h1>
                <div className={styles.imageContainer}>
                    <img className={styles.productImage} src={product.image} alt="Product Img" />
                </div>

                <p className={styles.productDescription}>{product.description}</p>
            </Card>
            <form className={styles.secondDivContainer} onSubmit={onAddToCardHandler}>
                <h2 className={styles.productPrice}>
                    Price: &#x20B1;{Number(product.price).toLocaleString()}
                    <Rating
                        style={{ color: 'orange' }}
                        emptySymbol="fa-regular fa-star fa-3x"
                        fullSymbol="fa fa-star fa-3x"
                        initialRating={product.rating}
                        readonly={true}
                        className={styles.rating}
                    />
                </h2>

                <div className={styles.quantityContainer}>
                    {outOfStock ? (
                        <h2 className={styles.outOfStock}>OUT OF STOCK</h2>
                    ) : (
                        <>
                            <label className={styles.quantityLabel} name="quantity" id="quantity">
                                Select Quantity
                            </label>
                            <input
                                className={styles.quantityInput}
                                type="number"
                                name="quantity"
                                id="quantity"
                                min="1"
                                max={product.countInStock}
                                value={quantity}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                }}
                            />
                        </>
                    )}
                </div>
                <h2 className={styles.stock}>Stock: {product.countInStock}</h2>
                <div className={styles.addToCartContainer}>
                    <Button type="submit" disabled={outOfStock} className={styles.addToCartBtn}>
                        ADD TO CART <i className="fa-solid fa-cart-shopping"></i>
                    </Button>
                </div>
                <div className={styles.reviewSectionContainer}>
                    <WriteReview productId={product._id} />
                    <Reviews reviews={reviews} />
                </div>
            </form>
        </div>
    );
};

export default ProductDetails;
