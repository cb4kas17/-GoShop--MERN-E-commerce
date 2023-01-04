import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductComponents/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../store/actions/productActions';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/Layout/ErrorMessage';
const ProductPage = () => {
    const productId = useParams().productId;
    const dispatch = useDispatch();
    const { productDetail, isLoading, error } = useSelector((state) => state.productDetail);

    useEffect(() => {
        dispatch(getSingleProduct(productId));
    }, [dispatch, productId]);

    if (error) {
        return <ErrorMessage errorMessage={error} />;
    }
    return (
        <div className="max-width">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <ProductDetails product={productDetail} reviews={productDetail.reviews} />
            )}
        </div>
    );
};

export default ProductPage;
