const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    age: Number,

});

const user_model = mongoose.model("users", userSchema);

async function main() {

    try {

        await mongoose.connect("mongodb+srv://anishajha_db_user:[EMAIL_ADDRESS]/?appName=Cluster0");
        const user = await user_model.findOne({ name: "Anisha" });
        const new_user = await user_model.create({
            name: "Anshuman",
            email: "[EMAIL_ADDRESS]",
            password: "[PASSWORD]",
            age: 21,
        });

    }
    finally {
        mongoose.disconnect();
    }

};