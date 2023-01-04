const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('connected', () => {
    console.log('MongoDB connection successful');
});

module.exports = mongoose;
