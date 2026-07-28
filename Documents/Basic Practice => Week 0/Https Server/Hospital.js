const express = require("express");
const app = express(); /// Insatance of Express createsd mw app can acces .get..put,.posst....etc

const patient = [{
    name: "Harkrat",
    age: "38",
    metadata: {
        profilepicture: "",
        pronouns: "he/him"
    },
    kidneys: [{
        healthy: false // by Post Request we are adding Data here inKidney Property of 0th Object
    }] // Hence length of this Kidney array property is Increasing sas we make post Request i.e adding data
}];
// Middleware to parse JSON request bodies
app.use(express.json()); // To pass and use Json body on Server while Post Request

// This Below First object here hence 1st element of array because first object ending below can be accesed by patient[0]
// First object in array of object

app.get("/", function (req, res) {
    const kiratKidneys = patient[0].kidneys; // From 1st Object accessiing kidneyy property
    const numberofKidneys = kiratKidneys.length;
    let no_healthy = 0;
    for (let i = 0; i < kiratKidneys.length; i++) {

        if (kiratKidneys[i].healthy) {
            no_healthy = no_healthy + 1;
        }

    }
    const unhealthy_no = numberofKidneys - no_healthy;

    res.json({ // res sends Object as an String via JSON
        numberofKidneys,
        no_healthy,
        unhealthy_no
    });

})


app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy; // whatever request is send along with body stored here
    patient[0].kidneys.push({
        healthy: isHealthy // whatever the data posted via request get updated in Kidney property =
        // It can be seen via get request when we amke get rquest => we see updated data
    })
    res.json({ // Since This request was of post type it does not want anything in response =>Hence we can send Empty Body
        msg: "Done!" //Or We can simply indicate in response that data is posted sucessfully
    })
})
// Replace Unhealthy Kidneys to Healthy
//If no Unhealthy Kidneys then Send 411 Status Code
app.put("/", function (req, res) {

    for (let i = 0; i < patient[0].kidneys.length; i++) {
        patient[0].kidneys[i].healthy = true;
        // We iterated on kidneys Array and for each element we set it's property i.e healthy = true
        // We update/Replace the kidneys/ Each element of kindeys array Healthy property   
    }
    res.json({
        msg: "Done!"
    })
})
// Removing all unhealthy kidneys
// Return 411 Error Code if There are No Unhealthy Kidneys => Make a Function to Check only then run this code
// res.status(411).json({msg: Error => You Have no Bad Kidneys})
app.delete("/", function (req, res) {
    const newKidneys = [];
    for (let i = 0; i < patient[0].kidneys.length; i++) {
        if (patient[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true
            })
        }
    }
    patient[0].kidneys = newKidneys; // Kidneys array have been set/updated to newKidneys
    res.json({ msg: "done" })
})


app.listen(4567, () => {
    console.log("Running on port 4567");
});





// const patient = [{
// name: "Harkrat", age: "38",
//  metadata: {
//      profilepicture: "",
//      pronouns: "he/him"
//   } ,
//   kidneys: [{
//       healthy: false
//   } ]
//     }];
