require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');

const path = require('path');
// Route import
const productsRoute = require('./Routes/productsRoute');
const userRoute = require('./Routes/userRoute');
const orderRoute = require('./Routes/orderRoute');
const reviewsRoute = require('./Routes/reviewsRoute');
// mongongo db connection
const db = require('./db');

// cors
app.use(cors());

// json and url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoute);
app.use('/api/user', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/reviews', reviewsRoute);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
