import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/actions/productActions';
import { deleteProductById } from '../../store/actions/productActions';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from './productsList.module.css';
import Modal from '../UI/Modal';
const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isLoading } = useSelector((state) => state.products);
    const [onDelete, setOnDelete] = useState({ delete: false, id: null });
    const [search, setSearch] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        dispatch(getAllProducts());
        setDeleteSuccess(false);
    }, [dispatch, deleteSuccess]);

    let filteredArray = products?.filter(
        (item) => item.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
    );
    const searchHandler = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div className={styles.usersListContainer}>
            <h1 className={styles.header}>Products List</h1>
            <div className={styles.filterContainer}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    onChange={searchHandler}
                    placeholder="Search name"
                />
            </div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={styles.usersListContentContainer}>
                        <div className={styles.usersTableHeaderContainer}>
                            <h2>Name</h2>
                            <h2>Price</h2>
                            <h2>Stock</h2>
                            <h2>Rate</h2>
                            <h2>Product ID</h2>
                            <h2>&nbsp;</h2>
                        </div>
                        {filteredArray.length === 0 && !isLoading ? (
                            <h2 className={styles.noItem}>No products found</h2>
                        ) : (
                            <>
                                {filteredArray?.map((item) => (
                                    <div className={styles.userContainer} key={item._id}>
                                        <h3>{item.name}</h3>
                                        <h3>&#8369;{Number(item.price).toLocaleString()}</h3>
                                        <h3>{item.countInStock}</h3>
                                        <h3>{item.rating}</h3>
                                        <h3>{item._id}</h3>
                                        <h3>
                                            <i
                                                className="fas fa-edit"
                                                onClick={() => {
                                                    navigate(`edit-product/${item._id}`);
                                                }}
                                            />
                                            <i
                                                className="fa-solid fa-trash-can"
                                                onClick={() => {
                                                    setOnDelete({ delete: true, id: item._id });
                                                }}
                                            />
                                        </h3>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    {onDelete.delete && (
                        <Modal
                            message="Are you sure you want to delete?"
                            button="No"
                            onClose={() => {
                                setOnDelete(false);
                            }}
                            additionalBtn={true}
                            additionalBtnFnc={() => {
                                dispatch(deleteProductById(onDelete.id));
                                setOnDelete(false, null);
                                setDeleteSuccess(true);
                            }}
                            additionalBtnName="Yes"
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsList;
