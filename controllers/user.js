const User = require("../models/user");
const { setUser, setUserStateless } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  //TODO: Validate email and password like correct email and password length
  User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  //TODO: Validate email and password like correct email and password length
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  //const sessionID = uuidv4(); TODO: Its required for stateless authentication.
  //setUser(sessionID,user);    TODO: Its required for stateless authentication.
  const token = setUserStateless(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
