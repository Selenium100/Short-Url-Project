const express = require('express')
const staticRoute = express.Router();
const pass = require("../models/url");

staticRoute.get('/', async (req,res)=>{
    const allUrls = await pass.find();
    return res.render('home' ,{
        urls:allUrls
    })
}) 

module.exports=staticRoute;