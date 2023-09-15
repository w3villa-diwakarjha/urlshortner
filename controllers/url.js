const shortid = require('shortid');

const URL = require('../models/url')
async function generateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortID = shortid.generate();
    try {
        // Create a new document in your database
        const newURL = new URL({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        // Save the new document
        await newURL.save();

        return res.json({ id: shortID });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortid;
    const result= await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

const createshortId= async (req,res)=>{
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
}

module.exports = {
    generateNewShortURL,
    handleGetAnalytics,
    createshortId
}