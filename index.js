const express = require('express')
const { connectToMongoDB } = require('./connection')
const app = express();
const dotenv = require('dotenv');
const URL = require('./models/url')
const urlRoute = require('./routes/url');
dotenv.config();
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('MongoDB connected'))

app.use(express.json())

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortid = req.params.shortId;
    try {
        // Use $push to add a new timestamp to visitHistory
        const entry = await URL.findOneAndUpdate(
            { shortId: shortid },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    },
                },
            },
            { new: true }
        );
        if (!entry) {
            return res.send("Bad Shortid");
        }

        if (entry && entry.redirectURL) {
            // Redirect to the URL
            res.send(entry);
        } else {
            // Handle the case when the redirectURL is not defined
            return res.status(404).send('Redirect URL not found');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error');
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})