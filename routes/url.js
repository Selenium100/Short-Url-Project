const express = require('express')
const router = express.Router();
const {handleGenerateNewShortUrl,handleGetUrlFromShortId,handleDeleteUrlFromId} = require('../controllers/url')

router.route('/user/url').post(handleGenerateNewShortUrl);
router.route('/user/:shortId').get(handleGetUrlFromShortId);

module.exports=router;