var express = require("express");
var cors = require("cors");
require("dotenv").config();
let bodyParser = require("body-parser");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${JSON.stringify(req.body)}`);
  next();
});

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;

  res.json({ name: name, type: type, size: size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
