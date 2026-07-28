const express = require("express");

const app = express();

// express.json() is a middleware of express to pass json body => post route
 app.use(express.json());

app.post("/todo",function(req,res) {



})

app.get("/todos",function(req,res) {

})


app.put("/completed",function(req,res) {
    
})

