const express = require("express");
const staticRoute = express.Router();
const pass = require("../models/url");

staticRoute.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await pass.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

staticRoute.get("/signup", (req, res) => {
  return res.render("signup");
});

staticRoute.get("/uploadprofile", (req, res) => {
  return res.render("upload");
});

staticRoute.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = staticRoute;
