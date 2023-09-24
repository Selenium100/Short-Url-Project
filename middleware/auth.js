
const {getUser} = require('../service/auth')

async function restrictToLoginForUserOnly(req,res,next){
   const userUUID = req.cookies?.token;
   console.log(`uuid is ${userUUID}`);
   if(!userUUID){
    return res.redirect('/login')
   }

   const user = getUser(userUUID);
   if(!user){
    return res.redirect('/login')
   }

   req.user = user;
   next();
}

async function checkAuth(req,res,next){
    const userUUID = req.cookies?.token;
    console.log(`uuid is ${userUUID}`);
 
    const user = getUser(userUUID);
 
    req.user = user;
    next();
}

module.exports = {
    restrictToLoginForUserOnly,
    checkAuth
}