const express = require("express");
const path = require('path');
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const connectMongoDB = require("./connectMongoDB");
const pass = require("./models/url");
const PORT = 5001;

const app = express();

connectMongoDB
  .connectMongoDB("mongodb://127.0.0.1:27017/urlShortner")
  .then((result) => {
    console.log("Connected with mongoDB..");
  })
  .catch((err) => {
    console.log(`Error in connection with mongoDB.... ${err}`);
  });

app.set("view engine", "ejs");
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/user/url", urlRoute);
app.use("/", urlRoute);
app.use('/',staticRoute)

app.get("/test/users", async (req, res) => {
  const allUrls = await pass.find();
  return res.render('home',{urls:allUrls});
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
