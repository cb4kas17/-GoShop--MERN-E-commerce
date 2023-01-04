import React from 'react';
import styles from './adminPageContainer.module.css';
import { Outlet, NavLink } from 'react-router-dom';

const AdminPageContainer = (props) => {
    return (
        <div className={styles.adminPageContainer}>
            <div className={styles.adminNavBar}>
                <NavLink
                    to="users-list"
                    className={(navData) =>
                        navData.isActive ? `${styles.active} ${styles.default}` : styles.default
                    }
                >
                    Users List
                </NavLink>
                <NavLink
                    to="products-list"
                    className={(navData) =>
                        navData.isActive ? `${styles.active} ${styles.default}` : styles.default
                    }
                >
                    Products List
                </NavLink>
                <NavLink
                    to="orders-list"
                    className={(navData) =>
                        navData.isActive ? `${styles.active} ${styles.default}` : styles.default
                    }
                >
                    Orders List
                </NavLink>
                <NavLink
                    to="add-product"
                    className={(navData) =>
                        navData.isActive ? `${styles.active} ${styles.default}` : styles.default
                    }
                >
                    Add Product
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminPageContainer;
