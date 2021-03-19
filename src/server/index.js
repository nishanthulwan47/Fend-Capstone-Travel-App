// Setup empty JS object to act as endpoint for all routes
let apiData;
let projectData;
const dotenv = require('dotenv');
dotenv.config();
const baseurl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apikey = `${process.env.API_KEY}&of=json&txt=`;
const lang = '&lang=en';

const fetch = require("node-fetch");
var path = require('path')
// Require Express to run server and routes
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))
// app.use(express.static('src/client'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8083, function () {
    console.log('Example app listening on port 8081!')
})

//app.get('/test', function (req, res) {
//    res.send(mockAPIResponse)
//})

// GET route
app.get('/all', sendData);
function sendData (req, res) {
  res.send(projectData);
};

// POST data
app.post('/addData', addData);
function addData (req,res){
    let newEntry = req.body.ft;
    apiData = retrieveData(baseurl, apikey, newEntry, lang)
    .then(function(apiData){
      projectData = {data: apiData};
      console.log(projectData);
      res.send(projectData);
    })
};

// Async GET
const retrieveData = async (url, key, text, ln) =>{
  const request = await fetch(url+key+text+ln);
  try {
  // Transform into JSON
  const allData = await request.json()
  //console.log(allData)
  return allData;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
