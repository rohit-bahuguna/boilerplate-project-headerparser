// index.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// to serve the static CSS file from the public folder by using the 
// built-in middleware function in Express
app.use(express.static('public'));

// routing--how the app responds to a client request to a particular endpoint
// when the route is matched, the handler function is executed--responds with the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// first test API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

// requested API endpoint from user stories--get the IP address, preferred languages, and system infos from the header
app.get("/api/whoami", (req, res) => {
  let myIP = req.header("X-Forwarded-For").split(',')[0];  // X-Forwarded-For method gets three IP addresses--client, proxy1, proxy 2
  let myLanguage = req.header('Accept-Language');
  let mySystem = req.header('User-Agent');
  res.json({
    ipaddress: myIP,
    language: myLanguage,
    software: mySystem
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
