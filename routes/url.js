const express= require('express');
const {generateNewShortURL,handleGetAnalytics}= require('../controllers/url')
const router= express.Router();

router.post('/',generateNewShortURL);
router.get('/analytics/:shortid',handleGetAnalytics)

module.exports=router;

