const app = require("express");

const jwt = require("jsonwebtokens"); // importing jwt library

// Basicallly for jwt.verify we need password to check if correct return input json object => Verification Sucessful
const jwt_password = 168874;

const users = [   // Array of Objects 
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];
// Returns True if User Exist and Return False if Usaer does not Exist return False
async function userexist(username, userpassword) {

    let exist = false;

    for (let i = 0; i < users.length; i++) {
        // If it is equal to username and password send in function call argument i.e request's body username/password
        if (users[i].username == username && users[i].password == userpassword) {
            exist = true;
        }

    }

    return exist;
}
//Must use Middlewares => To catch Body of Request Sent otherwise it will not catch request body
app.use(express.json());

app.post("/Signin", function (req, res) {

    const user_name = req.body.user_name;
    const user_password = req.body.user_password;

    if (!userexist(user_name, user_password)) {
        res.json({
            msg: "User Does not Exist in our DataBase"
        })
    }
    //jwt.sign creates a token and returns by taking user object i.e {username: username} and jwt_password as input
    var token = jwt.sign({ username: username }, jwt_password);

    return res.json({
        token
    });


});

app.get("/users", function (req, res) {

    const token = req.headers.authorization;

    try {
        // jwt.verify basically returns the Json input Object if it Verifies sucessfully else throws Error
        const decode = jwt.verify(token, jwt_password);

        const myusername = decode.username;
    }
    catch (err) {
        return res.status(403).json({
            msg: "Error Occured token not match => Verification Fails !!!"
        });
    }

    /// As by assignment we have to do this below thing at 1:14:00
    // Basically Return the Users which Don't have Username that I have => RealWorld Scenario
    res.json({
        user: users.filter(function (value) {
            //We pass value as json object i fthat's object username is same as myusername i.e find above => Return false       
            if (value.username == myusername) {
                return false;
            }
            else {
                return true;
            }
        })
    })


});


app.listen(3000);