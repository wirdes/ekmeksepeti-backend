const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/errors");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
dotenv.config({
  path: "./config/env/config.env",
});

connectDatabase();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname+'/public'));

const PORT = process.env.PORT;

app.use("/api/", routers);
// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
app.use(customErrorHandler);
app.listen(PORT, () => {
  console.log(`Uygulama Başlatıldı: http://localhost:${PORT}\n`);
});
