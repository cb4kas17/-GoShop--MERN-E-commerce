import axios from 'axios';
import { productsActions } from '../productsSlice';
import { productDetailActions } from '../productDetailSlice';
export const getAllProducts = () => {
    return async (dispatch) => {
        dispatch(productsActions.setLoading(true));
        try {
            const res = await axios(`${process.env.REACT_APP_API}api/products`);
            if (res.data.success) {
                dispatch(productsActions.setProducts(res.data.data));
                dispatch(productsActions.setLoading(false));
                dispatch(productsActions.setError(''));
            }
        } catch (error) {
            dispatch(productsActions.setError("There's an error in fetching products"));
            dispatch(productsActions.setLoading(false));
        }
    };
};

export const getSingleProduct = (productId) => {
    return async (dispatch) => {
        dispatch(productDetailActions.setProduct({}));
        dispatch(productDetailActions.setLoading(true));
        dispatch(productDetailActions.setError(''));
        try {
            const res = await axios(`${process.env.REACT_APP_API}api/products/${productId}`);
            if (res.data.success) {
                dispatch(productDetailActions.setProduct(res.data.data));

                dispatch(productDetailActions.setError(''));
                dispatch(productDetailActions.setLoading(false));
            }
        } catch (error) {
            dispatch(productDetailActions.setError('no id'));
            dispatch(productDetailActions.setLoading(false));
        }
    };
};
export const updateProduct = (productDetails, productId) => {
    return async (dispatch) => {
        dispatch(productDetailActions.setLoading(true));
        dispatch(productDetailActions.setError(''));
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}api/products/${productId}`, {
                productDetails,
            });
            if (res.data.success) {
                dispatch(productDetailActions.setProduct(res.data.data));
                dispatch(productDetailActions.setLoading(false));
                dispatch(productDetailActions.setError('none'));
            }
        } catch (error) {
            dispatch(productDetailActions.setError('no id'));
            dispatch(productDetailActions.setLoading(false));
        }
    };
};
export const deleteProductById = (productId) => {
    return async (dispatch) => {
        dispatch(productDetailActions.setLoading(true));
        dispatch(productDetailActions.setError(''));
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}api/products/${productId}`);
            if (res.data.success) {
                dispatch(productDetailActions.setLoading(false));
                dispatch(productDetailActions.setError(''));
            }
        } catch (error) {
            dispatch(productDetailActions.setError('Deletion of product failed'));
            dispatch(productDetailActions.setLoading(false));
        }
    };
};

export const createProduct = (productObject) => {
    return async (dispatch) => {
        dispatch(productsActions.setLoading(true));
        dispatch(productsActions.setError(''));

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/products`, {
                productDetails: productObject,
            });
            if (res.data.success) {
                dispatch(productsActions.setLoading(false));
                dispatch(productsActions.setError('none'));
            } else {
                dispatch(productsActions.setLoading(false));
                dispatch(productsActions.setError(res.data.message));
            }
        } catch (error) {
            dispatch(productsActions.setLoading(false));
            dispatch(productsActions.setError(error.message));
        }
    };
};
export const filterProducts = (searchKey, sortKey, catergoryKey) => {
    return async (dispatch) => {
        try {
            dispatch(productsActions.setLoading(true));
            const res = await axios.get(`${process.env.REACT_APP_API}api/products`);
            let filteredProducts = res.data.data;
            if (sortKey !== 'sort') {
                if (sortKey === 'highRatings') {
                    filteredProducts = res.data.data.sort((a, b) => {
                        return b.rating - a.rating;
                    });
                } else if (sortKey === 'lowRatings') {
                    filteredProducts = res.data.data.sort((a, b) => {
                        return a.rating - b.rating;
                    });
                } else if (sortKey === 'Ascending') {
                    filteredProducts = res.data.data.sort((a, b) => {
                        return a.price - b.price;
                    });
                } else if (sortKey === 'Descending') {
                    filteredProducts = res.data.data.sort((a, b) => {
                        return b.price - a.price;
                    });
                }
            }

            if (catergoryKey !== 'all') {
                filteredProducts = res.data.data.filter((item) => {
                    return item.category.toLowerCase() === catergoryKey.toLowerCase();
                });
            }
            if (searchKey.length !== 0) {
                filteredProducts = res.data.data.filter((item) => {
                    return item.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            }
            dispatch(productsActions.setProducts(filteredProducts));
            dispatch(productsActions.setLoading(false));
        } catch (error) {
            dispatch(productsActions.setError("There's an error in fetching products"));
            dispatch(productsActions.setLoading(false));
        }
    };
};
