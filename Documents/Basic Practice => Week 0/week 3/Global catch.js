const express = require("express");

const zod = require("zod");

//string()=> Now it Defines/tell to "zod"/zod that it will take String that look like schema which we can define
const schema = zod.string();

const app = express();
//Also validates the input => We are expecting body type of request is of json type 
app.use(express.json()); // Midddleware which is used to catch body of request i.e request of post type
//Must Call this middleware when there is request of post type to define I'm expecting body of json rype => Input validation
// express.json() => middleware will be called very Firstly in evry route even without passing it


app.post("/health-Checkup", function (req, res) {
    //In this Two Line we Manually do Checking that our input is number or array of numbers => Throws error catch by Global middleware 
    const kidneys = req.body.kidneys; // request's body is stored in kidneys => by req.body.kidneys
    const kidneyslength = req.kidneys.length;

    res.send("you have" + kidneylength + "kidneys");


});

// Global catch =>if there is exception/ Error in any of the routes => This Middleware will be called
// It is written below/ after all the routes => Function have 4 Parameters
app.use(function (err, req, res, next) {
    res.json({
        msg: "Sorry Something is up with our Server"
    })
});

// app.listen(3000);
