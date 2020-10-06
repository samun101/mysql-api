const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "app.get successful" });
});
require("./apps/testing.routing.js")(app);
// set port, listen for requests
app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
