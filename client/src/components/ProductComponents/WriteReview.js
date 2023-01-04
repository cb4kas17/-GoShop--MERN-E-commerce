import React, { useState, useRef, useEffect } from 'react';
import styles from './writeReview.module.css';
import Button from '../UI/Button';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { submitReview } from '../../store/actions/reviewsActions';
import { getSingleProduct } from '../../store/actions/productActions';
import Modal from '../UI/Modal';
import { reviewSliceActions } from '../../store/reviewsSlice';

const WriteReview = (props) => {
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.reviews);
    const [write, setWrite] = useState(false);
    const [rating, setRating] = useState(1);
    const [showUserExist, setShowUserExists] = useState(false);
    const [loginFirst, setLoginFirst] = useState(false);

    const reviewContentRef = useRef();
    const onSubmitHandler = () => {
        const review = {
            rating: rating,
            reviewContent: reviewContentRef.current.value,
        };

        dispatch(submitReview(review, props.productId));
        reviewContentRef.current.value = '';
        if (message === 'user exists') {
            setWrite(false);
        } else {
            setTimeout(() => {
                dispatch(getSingleProduct(props.productId));
            }, 1000);
        }
    };

    useEffect(() => {
        if (message === 'user exists') {
            setShowUserExists(true);
        } else if (message === 'login first') {
            setLoginFirst(true);
        }
    }, [message]);
    return (
        <>
            {write ? (
                <div className={styles.writeReviewContainer}>
                    <h1 className={styles.reviewHeader}>Give your review</h1>
                    <div className={styles.ratingContainer}>
                        <p>Rating</p>
                        <div className={styles.ratingStarsContainer}>
                            <Rating
                                style={{ color: 'orange' }}
                                emptySymbol="fa-regular fa-star fa-1x"
                                fullSymbol="fa fa-star fa-1x"
                                onChange={(e) => {
                                    setRating(e);
                                }}
                                initialRating={rating}
                            />
                        </div>
                    </div>
                    <textarea
                        className={styles.reviewContent}
                        name="review"
                        id="review"
                        cols="30"
                        rows="10"
                        ref={reviewContentRef}
                        placeholder="Write anything about the product"
                    />
                    <Button className={styles.addReviewButton} onClick={onSubmitHandler}>
                        Add Review
                    </Button>
                </div>
            ) : (
                <>
                    {showUserExist && (
                        <Modal
                            message="You already submitted a review on this product"
                            button="Okay"
                            onClose={() => {
                                setShowUserExists(false);
                                dispatch(reviewSliceActions.setMessage(''));
                            }}
                        />
                    )}
                    {loginFirst && (
                        <Modal
                            message="You must login first before submitting a review"
                            button="Okay"
                            onClose={() => {
                                setLoginFirst(false);
                                dispatch(reviewSliceActions.setMessage(''));
                            }}
                        />
                    )}
                    <Button
                        onClick={() => {
                            setWrite(true);
                        }}
                        className={styles.writeReview}
                    >
                        Write your review
                    </Button>
                </>
            )}
        </>
    );
};

export default WriteReview;
