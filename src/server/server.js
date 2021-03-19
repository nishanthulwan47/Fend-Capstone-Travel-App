// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
//app.use(express.static('website'));
app.use(express.static('dist'));

// Setup Server
const port = 8083;

/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

// GET route
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/add', callBack);
function callBack(req,res){
  res.send('POST received');
};

// POST data
app.post('/addData', addData);
function addData (req,res){
    let newEntry = {
      temp: req.body.temperature,
      date: req.body.date,
      user_response: req.body.user_response
    }
    projectData = newEntry;
    console.log(projectData);
    res.send(projectData);
};
