import React from 'react';
import styles from './reviews.module.css';
import Rating from 'react-rating';
const Reviews = (props) => {
    return (
        <>
            {props.reviews && props.reviews?.length === 0 ? (
                <h3 className={styles.noReview}>No reviews for this product</h3>
            ) : (
                <>
                    <h1 className={styles.reviewHeader}>Latest Reviews</h1>
                    {props.reviews?.map((item, i) => {
                        return (
                            <div className={styles.singleReviewContainer} key={i}>
                                <div className={styles.rating}>
                                    <Rating
                                        style={{ color: 'orange' }}
                                        emptySymbol="fa-regular fa-star fa-1x"
                                        fullSymbol="fa fa-star fa-1x"
                                        initialRating={item.rating}
                                        readonly={true}
                                    />
                                </div>
                                <p className={styles.reviewContent}>{item.comment}</p>
                                <p className={styles.author} style={{ fontStyle: 'italic' }}>
                                    By: {item.name}
                                </p>
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default Reviews;
