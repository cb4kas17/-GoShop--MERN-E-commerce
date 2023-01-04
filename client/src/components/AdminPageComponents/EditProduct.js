import React, { useEffect, useState } from 'react';
import styles from './editProduct.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { useDispatch } from 'react-redux';
import { productDetailActions } from '../../store/productDetailSlice';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../../store/actions/productActions';
import axios from 'axios';

const EditProduct = (props) => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { name, price, description, image, countInStock, category, _id } = productDetail;

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
        manualSetValue: nameSet,
    } = useInput((input) => input.trim().length !== 0, name);
    const {
        value: priceValue,
        isValid: priceIsValid,
        hasError: priceHasError,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        reset: priceReset,
        manualSetValue: priceSet,
    } = useInput((input) => input.length !== 0 && !isNaN(input), price);
    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
        manualSetValue: descSet,
    } = useInput((input) => input.trim().length !== 0, description);
    const {
        value: imageURLValue,
        isValid: imageURLIsValid,
        hasError: imageURLHasError,
        valueChangeHandler: imageURLChangeHandler,
        inputBlurHandler: imageURLBlurHandler,
        reset: imageURLReset,
        manualSetValue: imgSet,
    } = useInput((input) => input.trim().length !== 0, image);
    const {
        value: catergoryValue,
        isValid: catergoryIsValid,
        hasError: catergoryHasError,
        valueChangeHandler: catergoryChangeHandler,
        inputBlurHandler: catergoryBlurHandler,
        reset: catergoryReset,
        manualSetValue: categorySet,
    } = useInput((input) => input.trim().length !== 0, category);
    const {
        value: countInStockValue,
        isValid: countInStockIsValid,
        hasError: countInStockHasError,
        valueChangeHandler: countInStockChangeHandler,
        inputBlurHandler: countInStockBlurHandler,
        reset: countInStockReset,
        manualSetValue: stockSet,
    } = useInput((input) => input.length !== 0 && !isNaN(input), countInStock);
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setIsLoading(true);
                const res = await axios(`${process.env.REACT_APP_API}api/products/${productId}`);
                if (res.data.success) {
                    setProductDetail(res.data.data);
                    setIsLoading(false);
                    nameSet(res.data.data.name);
                    priceSet(res.data.data.price);
                    descSet(res.data.data.description);
                    imgSet(res.data.data.image);
                    categorySet(res.data.data.category);
                    stockSet(res.data.data.countInStock);
                }
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };
        fetchProductDetail();
    }, [productId, nameSet, priceSet, descSet, imgSet, categorySet, stockSet]);

    const onAddProductHandler = (e) => {
        e.preventDefault();
        nameBlurHandler();
        priceBlurHandler();
        descriptionBlurHandler();
        imageURLBlurHandler();
        catergoryBlurHandler();
        countInStockBlurHandler();
        if (
            nameIsValid &&
            priceIsValid &&
            descriptionIsValid &&
            imageURLIsValid &&
            catergoryIsValid &&
            countInStockIsValid
        ) {
            const product = {
                name: nameValue,
                price: Number(priceValue),
                description: descriptionValue,
                image: imageURLValue,
                category: catergoryValue,
                countInStock: Number(countInStockValue),
            };

            console.log(product);
            dispatch(updateProduct(product, _id));

            if (error !== 'none' && error !== '') {
                nameReset();
                priceReset();
                descriptionReset();
                imageURLReset();
                catergoryReset();
                countInStockReset();
            }
        }
    };
    return (
        <form className={styles.addProductContainer} onSubmit={onAddProductHandler}>
            <h1 className={styles.header}>Edit Product</h1>
            {props.isLoading && <LoadingSpinner />}
            {props.error === 'none' && (
                <Modal
                    message="Product updated successfully"
                    button="Okay"
                    onClose={() => {
                        dispatch(productDetailActions.setError(''));
                        dispatch(productDetailActions.setLoading(false));
                        navigate('/admin/products-list');
                    }}
                />
            )}
            {props.error === 'no id' && (
                <Modal
                    message="There's no product with that ID"
                    button="Okay"
                    onClose={() => {
                        dispatch(productDetailActions.setError(''));
                        dispatch(productDetailActions.setLoading(false));
                        navigate('/admin/products-list');
                    }}
                />
            )}
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Card className={styles.addProductContentContainer}>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={name}
                        value={nameValue}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        className={nameHasError ? styles.invalid : `${styles.inputItem}`}
                    />
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        placeholder={description}
                        value={descriptionValue}
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionBlurHandler}
                        className={descriptionHasError ? styles.invalid : `${styles.inputItem}`}
                        style={{ resize: 'none', height: '10rem' }}
                    />
                    <input
                        type="text"
                        name="imageurl"
                        id="imageurl"
                        placeholder={image}
                        value={imageURLValue}
                        onChange={imageURLChangeHandler}
                        onBlur={imageURLBlurHandler}
                        className={imageURLHasError ? styles.invalid : `${styles.inputItem}`}
                    />
                    <input
                        type="text"
                        name="catergory"
                        id="catergory"
                        placeholder={category}
                        value={catergoryValue}
                        onChange={catergoryChangeHandler}
                        onBlur={catergoryBlurHandler}
                        className={catergoryHasError ? styles.invalid : `${styles.inputItem}`}
                    />
                    <div className={styles.numbersContainer}>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder={price}
                            value={priceValue}
                            onChange={priceChangeHandler}
                            onBlur={priceBlurHandler}
                            className={priceHasError ? styles.invalid : `${styles.inputItem}`}
                        />
                        <input
                            type="number"
                            name="countInStock"
                            id="countInStock"
                            placeholder={countInStock}
                            value={countInStockValue}
                            onChange={countInStockChangeHandler}
                            onBlur={countInStockBlurHandler}
                            className={
                                countInStockHasError ? styles.invalid : `${styles.inputItem}`
                            }
                        />
                    </div>
                    <Button className={styles.addbtn} type="submit">
                        Update
                    </Button>
                </Card>
            )}
        </form>
    );
};

export default EditProduct;
