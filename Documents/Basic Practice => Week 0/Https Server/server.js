// const fs = require("express") ;// default library bundled along with Node

const express = require("express"); // npm install express in terminal => importing express locally in our machine

const app = express();

function sum(n) {
    let ans = 0;
    for (let i = 0; i <= n; i++) {
        ans = ans + i;
    }
    return ans;
}

app.get("/", function (req, res) {
    console.log("Incoming request:", req.query); // just to confirm request
    // function is callBack Function => Request will be send/Handled here one by One as Javascript is Single Threaded
    const n = parseInt(req.query.n); // .query is taking the value => you passed in the request catching that n value
    const ans = sum(n); // calling this function
    res.send("your answer is :" + ans);
})

app.listen(3000, () => {
    console.log(" Server is running on http://localhost:3000");
});

//app.listen(3000);