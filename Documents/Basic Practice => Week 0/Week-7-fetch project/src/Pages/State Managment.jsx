// CLeaner Way To Store The State of Your APP to get Rid of Unneceessary Re-Renders
import mongoose from "mongoose";

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://anishajha_db_user:[EMAIL_ADDRESS]/?appName=Cluster0";

async function main() {

    const client = new MongoClient(uri);

    try {

        await client.connect();
        const db = client.db("user_db");
        const collection = db.collection("users");

    }
    finally {
        await client.close();
    }
};

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,

});

const user_model = mongoose.model("user", userSchema);


