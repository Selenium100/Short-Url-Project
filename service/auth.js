const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Nitya@#$gsfcvst";

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function setUserStateless(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

//function getUser(id){
//return sessionIdToUserMap.get(id);     TODO: This is use for statefull authentication.
//}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  setUserStateless,
  getUser,
};
