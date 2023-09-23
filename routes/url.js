const express = require('express')
const router = express.Router();
const {handleGenerateNewShortUrl,handleGetUrlFromShortId,handleDeleteUrlFromId} = require('../controllers/url')

router.route('/').post(handleGenerateNewShortUrl);
router.route('/user/:shortId').get(handleGetUrlFromShortId);

module.exports=router;