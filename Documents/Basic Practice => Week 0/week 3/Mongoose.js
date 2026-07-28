const mongoose = require("mongoose"); //Importing mongoose library

//Give the url in which you connect the cluster database => Our BackEnd is Connected with DataBase
mongoose.connect("");

// First here we define the model i.e define the Schema/Structure what table we are using and what type of input is putting in it
const User = mongoose.model('Users', { name: String, password: String, email: String });

// Entering data in Users Table by passing in User Concstrctor which refers to model / Users Table 
const user1 = new User({
    name: Harkirat,
    password: Harki4,
    email: Harki4_kirat / mail.com
})
// Saving our entry in Users table by doing user1.save()
user1.save();

// Creating a http route 

const express = require("express");

const app = express();

app.use(express.json());

app.post("/Signin", async function (req, res) {

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    // Defining Schema stored in const User => User now stores the schema of Mongoose
    const User = mongoose.model('User', { name: String, password: String, email: String });

    // User.findOne => Basically make reques to Mongo DB and Searches that does any User with email: email Exists ?
    // If There  eexist any user then it Returns True else False => User.findOne => Async Function => await
    const userExist = await User.findOne({ email: email });

    if (userExist) { //if user exist then send this response Else go on to Create user
        return res.status(403).send("User already Exist");
    }


    //Adding new Data entry in the Constructor of Model of mongoose i.e User
    const user1 = new User({
        name: name,
        password: password,
        email: email
    })

    user1.save();

    res.json({
        msg: "User Created Sucessfully"
    });

});

