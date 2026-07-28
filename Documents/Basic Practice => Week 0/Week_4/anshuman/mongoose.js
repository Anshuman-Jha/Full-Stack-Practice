const mongoose = require(mongoose);


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema = new mongoose.Schema({
    price: 800,
    title: cohort
})
// Creating an object where we can perform CRUD operation => create,read,delete,update=> User, course is that object
const User = mongoose.model('User', 'UserSchema'); // mongoose.model => 'User' is name by which this data is Saved
const Course = mongoose.model('Course', 'CourseSchema');

//Create Operation
User.create({
    username: req.body.username,
    password: req.body.password,
    purchased: req.body.purchased
})

// Read Operation
User.findOne({
    username: Anshuman
})
User.findById("004");
User.find({
    username: Anshuman
    password: "098764"
})

// Update Operation
User.updateOne({ // Particular Updation => Any Single Property => id , username
    id: "85*"
}, {
    username: "jha"
})
User.update({}, {
    //When you want update something for all users / all items in database => Setting it's value to something
    premium: "true"
})

// Delete Operation
User.deleteMany({}) // To Delete all together 
User.deleteOne({
    username: "Anshuman"
})