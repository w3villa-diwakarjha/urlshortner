const express= require('express');
const {generateNewShortURL,handleGetAnalytics,createshortId}= require('../controllers/url')
const router= express.Router();

router.post('/',generateNewShortURL);
router.get('/:shortId',createshortId)
router.get('/analytics/:shortid',handleGetAnalytics)

module.exports=router;

