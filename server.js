// Setup empty JS object to act as endpoint for all routes
projectData = {};
//Install express and require it
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");

/****************************************************************************/
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/****************************************************************************/
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/****************************************************************************/
// Initialize the main project folder
app.use(express.static("website"));

/****************************************************************************/
//Creating a GET route
app.get("/all", function (req, res) {
  res.send(projectData);
});

/****************************************************************************/
//Creating a POST route
app.post("/add", info);
function info(req, res) {
  console.log("ana henaaa", req);
  projectData["temprature"] = req.body.data.temprature;
  projectData["date"] = req.body.data.date;
  projectData["input"] = req.body.data.input;
  res.send(projectData);
}

/****************************************************************************/
// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on local host: ${port}`);
}
