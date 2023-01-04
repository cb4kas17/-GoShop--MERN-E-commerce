import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUserById } from '../../store/actions/usersAction';
import { usersSliceAction } from '../../store/usersSlice';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from './usersList.module.css';
import Modal from '../UI/Modal';
const UsersList = () => {
    const dispatch = useDispatch();
    const { users, status, message } = useSelector((state) => state.users);
    const [onDelete, setOnDelete] = useState({ delete: false, id: null });
    const [search, setSearch] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        dispatch(getUsers());
        setDeleteSuccess(false);
    }, [dispatch, deleteSuccess]);

    let filteredArray = users?.filter(
        (item) => item.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
    );
    const searchHandler = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div className={styles.usersListContainer}>
            <h1 className={styles.header}>Users List</h1>
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
            {status !== '' && status !== 'success' && (
                <div className={styles.absolute}>
                    {status === 'pending' && <LoadingSpinner />}
                    {status === 'failed' && (
                        <Modal
                            message={message}
                            button="Okay"
                            onClose={() => {
                                dispatch(usersSliceAction.setStatus(''));
                            }}
                        />
                    )}
                </div>
            )}
            <>
                <div className={styles.usersListContentContainer}>
                    <div className={styles.usersTableHeaderContainer}>
                        <h2>User ID</h2>
                        <h2>Name</h2>
                        <h2>Email</h2>
                        <h2>&nbsp;</h2>
                    </div>
                    {filteredArray.length === 0 && status !== 'pending' ? (
                        <h2 className={styles.noItem}>No users found</h2>
                    ) : (
                        <>
                            {filteredArray?.map((item) => (
                                <div className={styles.userContainer} key={item._id}>
                                    <h3>{item._id}</h3>
                                    <h3>{item.name}</h3>
                                    <h3>{item.email}</h3>
                                    <h3>
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
                            dispatch(deleteUserById(onDelete.id));
                            setOnDelete(false, null);
                            setDeleteSuccess(true);
                        }}
                        additionalBtnName="Yes"
                    />
                )}
            </>
        </div>
    );
};

export default UsersList;
