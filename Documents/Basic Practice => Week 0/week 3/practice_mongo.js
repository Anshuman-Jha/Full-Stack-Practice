import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://anishajha_db_user:[EMAIL_ADDRESS]/?appName=Cluster0");

async function main() {
    try {

        await client.connnect();
        const database = client.db("users_db");
        const collections = database.collection("users");

        const result = await collections.findOne({ name: "Anisha" });


    }

    finally {
        await client.close();
    }
};

main().catch(console.error);