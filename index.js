var express = require("express");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  (request, response, next) => {
    const { originalname: name, mimetype: type, size } = request.file;

    response.json({ name, type, size });

    return next();
  },
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
