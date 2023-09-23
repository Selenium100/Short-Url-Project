
const shortid = require('shortid');
const pass = require('../models/url')

async function handleGenerateNewShortUrl(req,res){
    const url = req.body.url;
    if(!url){
        return res.status(400).json({msg:"url is required"})
    }
    const shortId = shortid.generate();
    await pass.create({
        shortid:shortId,
        redirectUrl:url,
        visitHistory:[]
    })

    return res.render('home',{
      id:shortId
    })
   
}

async function handleGetUrlFromShortId(req,res){
    const shortId = req.params.shortId;
    const entry = await pass.findOneAndUpdate({shortid:shortId},
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
     res.redirect(entry.redirectUrl);
}

module.exports ={
    handleGenerateNewShortUrl,
    handleGetUrlFromShortId
}