import React from 'react';
import NavBar from './components/Layout/NavBar';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

import { useSelector } from 'react-redux';

// other components
import LoadingSpinner from './components/UI/LoadingSpinner';
import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import ResetPasswordPage from './pages/AuthPages/ResetPasswordPage';
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage';
// pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const OrdersPage = React.lazy(() => import('./pages/OrdersPage'));
const OrderInfoPage = React.lazy(() => import('./pages/OrderInfoPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage.js'));
const AdminPage = React.lazy(() => import('./pages/AdminPage.js'));
// Admin pages
const UsersList = React.lazy(() => import('./components/AdminPageComponents/UsersList'));
const ProductsList = React.lazy(() => import('./components/AdminPageComponents/ProductsList'));
const OrdersList = React.lazy(() => import('./components/AdminPageComponents/OrdersList'));
const AddProduct = React.lazy(() => import('./components/AdminPageComponents/AddProduct'));
const EditProduct = React.lazy(() => import('./components/AdminPageComponents/EditProduct'));
function App() {
    const user = useSelector((state) => state.user.user);
    const { isLoading, error } = useSelector((state) => state.productDetail);
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
                <NavBar />
                <div className="App">
                    <main>
                        <Routes>
                            <Route path="/" element={<Navigate to="/products" />} />
                            <Route
                                path="/login/*"
                                element={user._id ? <Navigate to="/" /> : <LoginPage />}
                            ></Route>
                            <Route
                                path="/register"
                                element={user._id ? <Navigate to="/" /> : <RegisterPage />}
                            />
                            <Route
                                path="/forgotPassword"
                                element={user._id ? <Navigate to="/" /> : <ForgotPasswordPage />}
                            />
                            <Route
                                path="/resetPassword/:token"
                                element={user._id ? <Navigate to="/" /> : <ResetPasswordPage />}
                            />
                            <Route path="/products" element={<HomePage />} />
                            <Route path="/product/:productId" element={<ProductPage />} />
                            <Route
                                path="/orders"
                                element={!user._id ? <Navigate to="/" /> : <OrdersPage />}
                            />
                            <Route
                                path="/orders/:orderId"
                                element={!user._id ? <Navigate to="/" /> : <OrderInfoPage />}
                            />
                            <Route
                                path="/profile"
                                element={!user._id ? <Navigate to="/" /> : <ProfilePage />}
                            />
                            <Route path="/admin/*" element={<AdminPage />}>
                                <Route path="users-list" element={<UsersList />} />
                                <Route path="products-list" element={<ProductsList />} />
                                <Route path="orders-list" element={<OrdersList />} />
                                <Route path="add-product" element={<AddProduct />} />
                                <Route
                                    path="products-list/edit-product/:productId"
                                    element={<EditProduct isLoading={isLoading} error={error} />}
                                />
                            </Route>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </main>
                </div>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
