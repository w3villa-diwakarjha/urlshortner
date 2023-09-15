const express = require('express')
const { connectToMongoDB } = require('./connection')
const app = express();
const dotenv = require('dotenv');
const URL = require('./models/url')
const urlRoute = require('./routes/url');
dotenv.config();
const mongodburl=process.env.MONGO_URL;
connectToMongoDB(mongodburl)
.then(() => console.log('MongoDB connected'))

app.use(express.json())

app.use('/url', urlRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})