import React, { useEffect, useState } from 'react';
import styles from './navBar.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/actions/userActions';
let isInitial = true;
const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.totalItems);
    const user = useSelector((state) => state.user.user);

    const [animation, setAnimation] = useState(false);
    const [dropdown, setDropDown] = useState(false);

    useEffect(() => {
        if (cartCount === 0) {
            return;
        }
        if (isInitial) {
            isInitial = false;
            return;
        }
        setAnimation(true);
        const timer = setTimeout(() => {
            setAnimation(false);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [cartCount]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navLogoContainer}>
                    <Link className={styles.navbarLogo} to="/">
                        GoShop!
                    </Link>
                </div>

                <div className={styles.navbarItemContainer}>
                    <ul className={styles.navbarList}>
                        {!user.name ? (
                            <li className={styles.navbarItem}>
                                <Link to="/login">Login</Link>
                                <h1>{process.env.REACT_APP_TEST}</h1>
                            </li>
                        ) : (
                            <div className={styles.dropdownContainer}>
                                <h2 className={styles.name}>{user.name.split(' ')[0]}</h2>
                                {dropdown ? (
                                    <button
                                        onClick={() => {
                                            setDropDown(false);
                                        }}
                                        className={styles.arrowContainer}
                                    >
                                        <i
                                            className={`fa-sharp fa-solid fa-caret-up ${styles.arrow}`}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setDropDown(true);
                                        }}
                                        className={styles.arrowContainer}
                                    >
                                        <i
                                            className={`fa-sharp fa-solid fa-caret-down ${styles.arrow}`}
                                        />
                                    </button>
                                )}
                                {dropdown && (
                                    <ul className={styles.dropdownContent}>
                                        <li
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                setDropDown(false);
                                                navigate('/profile');
                                            }}
                                        >
                                            Profile
                                        </li>
                                        <li
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                setDropDown(false);
                                                navigate('/orders');
                                            }}
                                        >
                                            Orders
                                        </li>
                                        <li
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                dispatch(logoutUser());
                                                setDropDown(false);
                                                navigate('/');
                                            }}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}

                        <li className={styles.navbarItem}>
                            <Link
                                to="/cart"
                                className={`${styles.cartLinkContainer} ${
                                    animation && styles.bump
                                }`}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                                <div className={styles.cartCount}>{cartCount}</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
