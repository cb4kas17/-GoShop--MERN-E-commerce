import React, { useEffect } from 'react';
import ShopItems from '../components/HomePageComponents/ShopItems';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../store/actions/productActions';
import ErrorMessage from '../components/Layout/ErrorMessage';
import FilterBar from '../components/HomePageComponents/FilterBar';
const HomePage = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (error) {
        return <ErrorMessage errorMessage={error} />;
    }
    return (
        <div className="max-width">
            <FilterBar />
            {isLoading ? <LoadingSpinner /> : <ShopItems products={products} />}
        </div>
    );
};

export default HomePage;
