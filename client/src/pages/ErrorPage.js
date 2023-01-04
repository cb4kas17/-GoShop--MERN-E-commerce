import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div
            className="max-width"
            style={{
                display: 'flex',
                flexDirection: 'column',
                placeItems: 'center',
                gap: 20,
                fontSize: '5rem',
            }}
        >
            <h1 style={{ textAlign: 'center', fontSize: 50, marginTop: '30rem' }}>
                PAGE NOT FOUND
            </h1>
            <Link
                style={{
                    border: '1px solid #000',
                    padding: '1rem 2rem',
                    borderRadius: '2rem',
                    background: '#193658',
                    color: '#fff',
                }}
                to="/products"
            >
                Go to home page
            </Link>
        </div>
    );
};

export default ErrorPage;
