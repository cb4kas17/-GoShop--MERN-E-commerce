import React from 'react';
import styles from './addProduct.module.css';
import useInput from '../../hooks/useInput';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/actions/productActions';
import { productsActions } from '../../store/productsSlice';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
const AddProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.products);
    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInput((input) => input.trim().length !== 0);
    const {
        value: priceValue,
        isValid: priceIsValid,
        hasError: priceHasError,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        reset: priceReset,
    } = useInput((input) => input.length !== 0 && !isNaN(input));
    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
    } = useInput((input) => input.trim().length !== 0);
    const {
        value: imageURLValue,
        isValid: imageURLIsValid,
        hasError: imageURLHasError,
        valueChangeHandler: imageURLChangeHandler,
        inputBlurHandler: imageURLBlurHandler,
        reset: imageURLReset,
    } = useInput((input) => input.trim().length !== 0);
    const {
        value: catergoryValue,
        isValid: catergoryIsValid,
        hasError: catergoryHasError,
        valueChangeHandler: catergoryChangeHandler,
        inputBlurHandler: catergoryBlurHandler,
        reset: catergoryReset,
    } = useInput((input) => input.trim().length !== 0);
    const {
        value: countInStockValue,
        isValid: countInStockIsValid,
        hasError: countInStockHasError,
        valueChangeHandler: countInStockChangeHandler,
        inputBlurHandler: countInStockBlurHandler,
        reset: countInStockReset,
    } = useInput((input) => input.length !== 0 && !isNaN(input));

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
                rating: 0,
                reviews: [],
            };

            console.log(product);
            dispatch(createProduct(product));

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
            <h1 className={styles.header}>Add Product</h1>
            {isLoading && <LoadingSpinner />}
            {error === 'none' && (
                <Modal
                    message="Product added successfully"
                    button="Okay"
                    onClose={() => {
                        dispatch(productsActions.setError(''));
                        dispatch(productsActions.setLoading(false));
                        nameReset();
                        priceReset();
                        descriptionReset();
                        imageURLReset();
                        catergoryReset();
                        countInStockReset();
                    }}
                />
            )}
            <Card className={styles.addProductContentContainer}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Product name"
                    value={nameValue}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    className={nameHasError ? styles.invalid : `${styles.inputItem}`}
                />
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Product description"
                    value={descriptionValue}
                    onChange={descriptionChangeHandler}
                    onBlur={descriptionBlurHandler}
                    className={descriptionHasError ? styles.invalid : `${styles.inputItem}`}
                    style={{ resize: 'none' }}
                />
                <input
                    type="text"
                    name="imageurl"
                    id="imageurl"
                    placeholder="Product image url"
                    value={imageURLValue}
                    onChange={imageURLChangeHandler}
                    onBlur={imageURLBlurHandler}
                    className={imageURLHasError ? styles.invalid : `${styles.inputItem}`}
                />
                <input
                    type="text"
                    name="catergory"
                    id="catergory"
                    placeholder="Product category"
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
                        placeholder="Price"
                        value={priceValue}
                        onChange={priceChangeHandler}
                        onBlur={priceBlurHandler}
                        className={priceHasError ? styles.invalid : `${styles.inputItem}`}
                    />
                    <input
                        type="number"
                        name="countInStock"
                        id="countInStock"
                        placeholder="Stock"
                        value={countInStockValue}
                        onChange={countInStockChangeHandler}
                        onBlur={countInStockBlurHandler}
                        className={countInStockHasError ? styles.invalid : `${styles.inputItem}`}
                    />
                </div>
                <Button className={styles.addbtn} type="submit">
                    Add product
                </Button>
            </Card>
        </form>
    );
};

export default AddProduct;
