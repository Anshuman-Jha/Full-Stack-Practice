// const express = require("express"); //import a famous Library called Express which exist somewhere in node package 
// you have to write npm install express in terminal => In order to bring from Internet to your Machine
// Please bring express Library locally to my Machine 

const bodyParser = require("body-parser"); // To acess body of a request 

const fs = require("fs"); // Built-in with Node js
// BACKEND Http server in Node Js Api below 
const express = require("express");
const port = 3001;
const app = express(); // creats instance of express this functon express() returns something
// app is now object of express cana cess .get() 

// middleware => In future need to learn
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log(req.body);
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//app.listen(port) // app.listen(port) => Means that Allow this particular port i.e 3000 to get used/occupied
//  for https server backend => No two application or program can use same port
// API Ends Here //
// fs.readFile() => file system library which enable to read File