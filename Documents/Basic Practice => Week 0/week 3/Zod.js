const express = require("express");

app = express();

const zod = require("zod"); //Import zod library into const zod variable => now const zod is a "zod" class


//string()=> Now it Defines/tell to "zod"/zod that it will take String that look like schema which we can define
const schema = zod.string()

app.use(express.json()); // Midddleware which is used to catch body of request i.e request of post type

//Instead we can do Input Validation with the Help of zod=>We Define will Consider of Input this Type only as Valid
const scheme = zod.array(zod.number()); // My const scheme will be of array of Integers type


// WE Manually Check and o Global Catch if Error
app.post("/health-Checkup", function (req, res) {
    //In this Two Line we Manually do Checking that our input is number or array of numbers => Throws error catch by Global middleware 
    const kidneys = req.body.kidneys; // request's body is stored in kidneys => by req.body.kidneys
    const kidneyslength = req.kidneys.length;

    // Here we Sync/Parse the Request body i.e Input which User gave=>was passed when request was made =>kidneys is req.body 
    const inputValidation = scheme.safeParse(kidneys);

    if (!inputValidation.success) {
        res.status(403).json({
            msg: "Error Input is not Valid"
        })
    }

    res.send({
        inputValidation // zod will now tell Everything that whether input is valid or also give messge on ui 
    });

    // Have to Take valid input of Type Email: String ,Paswword: Atleast 8 Character ,Country:"IN", "US"

    //We Define that When my Input is Valid => Set of Strict Rules=> Can be Easily with the help of zod
    const valid = zod.object({
        email: zod.string().email(), // Basically Checks the String is existing Email or not
        password: zod.string().min(8), // Password String atleast of 8 Length
        country: zod.literal("US").or(zod.literal("IN"))
    })

    const response = valid.safeParse(user_input); //We check user input is of valid type by Parsing user Input

    //We can define a Function also to validateInput 
    function validateInput(obj) {

        const valid = zod.object({
            email: zod.string().email(), // Basically Checks the String is existing Email or not
            password: zod.string().min(8), // Password String atleast of 8 Length
            country: zod.literal("US").or(zod.literal("IN"))
        })

        //Parsing object which was given by user => response variable stores the property of zod object which it returns on UI after matching
        const response = valid.safeParse(obj);

        console.log(response);

    }
    // MiddleWare have already called  above => Maing the route when ValidateInput function is made 
    app.post("/health-status", function (req, res) {

        const response_ = validateInput(req.body);//Passing response's body as an argument/obj in ValidateInput fuction

        if (!response_.success) {
            res.status(404).json({
                msg: "Given Input is Invalid, Stick to Rules !"
            })
            return; // Early Return if Input not valid/ not Sucess
        }

    })



    validateInput({
        email: "a4janshuamnjha@.com",
        password: "16887456",
        country: "IN"

    }) //Caling a function


    // Global Ctach here After the ROutes
    app.use(function (err, req, res, next) {
        res.json({
            msg: "Sorry Something is up with our Server"
        })
    });


});


