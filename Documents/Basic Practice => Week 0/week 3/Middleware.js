const express = require("express");

//MiddleWares stored here which will be called in routes/ app.get()
//Generic Function => Which always take three Arguments and Paramter => req, res, next
//next()=>Ok!Go to next Function in the route if conidtion written true for user authentication else get out
function userMiddleware(req, res, next) {

    const username = req.headers.username;
    const password = req.headers.password;

    if (username != "anshuman" || password != "pass") {
        res.status(403).json({
            msg: "Invalid user"
        })
    }
    else {
        // This next is enbling us to go to next function in the route / app,get()
        // If only Middleware contians next() thenonly code flow oges to next function i.e function(req,res)
        next();
    }
}
// Input Validation Middleware
function kidneysCheck(req, res, next) {

    const kidneyId = req.query.kidneyid;

    if (kidneyid === 1 || kidneyId === 2) {
        res.json({
            msg: "input and user  is valid"
        })
    }
    else {
        // This next is enbling us to go to next function in the route / app,get()
        next();
    }

}


const app = express();
// function(req,res)=>Callback Function which will be called handling user authentication without Middleware
app.get("/health-checkup", function (req, res) {

    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;
    // User Authentication in headers via middlewarres
    if (username === "anshuman" && password === "pass") {
        if (kidneyid === 1 || kidneyId === 2) {
            res.json({
                msg: "input and user  is valid"
            })
        }
    }

});

app.get("/health-checkup", function (req, res) {
    if (username != "anshuman" || password != "pass") {
        res.status(400).json({
            msg: "Invalid user"
        })
    }
    if (kidneyid != 1 || kidneyId != 2) {
        res.json({
            msg: "invaild input there are maximum 2 kidneys"
        })
    }

});

// Now Building routes using MiddleWares which is stored somewhere for user authentication and input validation
// We are Just callling those function here in our route / app.get()
app.get("/health-checkup", userMiddleware, kidneysCheck, function (req, res) {

    res.send("your Kidneys are Fine");

});
// express.json() => Itself returns the function => Which is not in case of app.use(userMiddleware)
// By app.use(express.json()) => We are Specifying that I am expecting json as Input please pass json only
app.use(express.json()); // For post type request we implement app.use()=> to catch Body Paramter in post request

// app.use => Means after this line this Middleware will be called in Each Route Automatically

app.use(userMiddleware); // app.use() => UserMiddleware will be called at 'first' even though we did not pass 
// User Middleware will be called on each Route Below it no need to Pass again & again in every route

app.post("/health-checkup", kidneysCheck, function (req, res) {

    // By app.use(express.json()) => We are Specifying that I am expecting json as Input please pass json only
    console(req.body); // Print body of post request type => request body can be text or json or any other

    res.json({
        msg: "your Kidneys are Fine"
    });

});

app.get("/health-checkup", kidneysCheck, function (req, res) {

    res.json({
        msg: "your Kidneys are Fine, Checkup is Complete"
    });

});

// app.listen(3000);