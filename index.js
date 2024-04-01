//Packages
const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

//milddlewears
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes

app.use(require("./routers/index"));

//execution server web
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the User API").end();
});

// start the server
app.listen(port, () => {
  console.log("server running in http://localhost:", port);
});
