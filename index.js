const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoginForUserOnly, checkAuth } = require("./middleware/auth");

const connectMongoDB = require("./connectMongoDB");
const pass = require("./models/url");
const multer  = require('multer')

const PORT = 5001;

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

connectMongoDB
  .connectMongoDB("mongodb://127.0.0.1:27017/urlShortner")
  .then((result) => {
    console.log("Connected with mongoDB..");
  })
  .catch((err) => {
    console.log(`Error in connection with mongoDB.... ${err}`);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user/url", restrictToLoginForUserOnly, urlRoute);
app.use("/", urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/",  userRoute);


app.get("/upload",(req,res)=>{
  return res.render('upload')
})

app.post("/profile",upload.single("uploadphoto"),(req,res)=>{
console.log(req.body);
console.log(req.file);

return res.redirect("/");
})

app.get("/test/users", async (req, res) => {
  const allUrls = await pass.find();
  return res.render("home", { urls: allUrls });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
