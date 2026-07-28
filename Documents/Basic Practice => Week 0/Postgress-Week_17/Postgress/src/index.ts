import { Client } from "pg";
import express from "express";
// Client is a Class
// initalizes the Instance of pg client and In Constructor we pass Connection String
const pgClient = new Client("postgresql://neondb_owner:npg_iaC6DeQVYN8G@ep-silent-flower-a1c6lozs.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

// Both Ways are Correct 

// We can pass Connection String / can Also Mention Configuration => To Creatw Instance
// Mention the Credentials of Our Database so that it can Connect to it  
const pgClient2 = new Client({
    user: "neondb_owner",
    password: "npg_iaC6DeQVYN8G",
    port: 5432,
    host: "ep-silent-flower-a1c6lozs.ap-southeast-1.aws.neon.tech",
    database: "neondb",

})

// It is Async Function to connect with neon_db it Takes Time => we await
async function main() { // await can only be written inside async function
    await pgClient.connect();

    // Can Send all SQL Queries via Instance of Client class i.e pgClient to postgres db

    // Read from users DataTable the entire row
    const response = await pgClient.query("SELECT * FROM users;")
    console.log(response.rows);

    // Update into users DataTable 
    const response2 = await pgClient.query("UPDATE users SET username = 'AnshuJha' WHERE password = '14J'; ")
    console.log(response2.rows);

    // Now For CRUD into Different DataTable We just mention Table Name in Query
    // Since I have Already Connected to Neon DataBase via Client class i.e pgClient.connecct()

    // Inserted into Todo Table
    const add_todo = await pgClient.query("INSERT INTO todos (title, description, done) VALUES('Reading', '5 to 6', 'false') )");

}

// Must call This Fucntion Then ONly what Inside Functon will be Executed 
main();

// SQL Injection During Express/WEB app
const app = express();
app.use(express.json()); // in Post reques this middleware express.json() is must
app.post("/signup", async (req, res) => {
    // Catching response of client i.e value of Corresponding to username/email/password keys
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;

    try {
        // Inserting the Input Gotten from User and As it is Appending in Postgress Database
        // Meaning if User Gave some input Engineered as SQL Query then that Query will Update database 
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}') RETURNING id;`

        const response = await pgClient.query(insertQuery);
        // If This Response gives me default generated userid then we add in DataTable of Address Cloumn's i.e in userid 
        /// We have Written in Query Returning id 

        // Here New Generated id after inserting in users datatable can be fetched via this
        const userid = response.rows[0].id;
        // RELATION => users & adress table => making query for adding in adresstable
        const insertaddressQuery = `INSERT INTO address {address,city,country,userid} VALUES {$1, $2, $3, $4};`

        const adddress_response = await pgClient.query(insertaddressQuery, [address, city, country, userid]);

        res.json({
            message: "You have Signed Up !!!"
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "error while signing up !!!"
        })
    }
    // Solution to it is Writing in This Way => Avoid SQL Injection
    // Basically Signinfy by/Store it in variable $1, $2, $3rd Varaible => Do not Append User Given Input as it is  
    // This Query will Reach as it is DataBase => Sending Value Seperately => Signified by Three Variable
    const insertQuery2 = `INSERT INTO users {username, email, password} VALUES {$1, $2, $3};`

    // Whatever Even Engineered SQL Query Given by User => It is Stored as username , email, password in Users DataTable as it is  
    // Values Will Reach Seperately in the Database whatever it is engineered => Stored as Username, email, Password
    const response2 = await pgClient.query(insertQuery2, [username, email, password]);

    // USER WILL DELTE ENTIRE USER DATATABLE of NEON DB => SQL INJECTION
    // If User Intentionally want to Inject Sql Query then can pass Password value as this which
    // It Lead to password as " " AND Making New SQL Querie i.e Delete * from useer 
    //This is Injecting it's own NEW SQL Query => Which We have Not made it  
    {
        "username": "harkirat",
            "email": "hark@",
                "password": "') DELETE * FROM users; "
    }

});
// Relation in SQL DataBase => Relation with Other Data Table
// Transaction Explained => 2 SQL Queries 
async function main2() {

    //When we Have 2 SQL Queries One after the Other then we use Transaction

    // Transaction => Both Qurey Goes in or NEither Goes => Not Partially 1 gone and 1 Fail
    // Both Query => Both in users and adress DataBase info should be added or None of Them
    const insertQuery = `INSERT INTO users {username, email, password} VALUES {$1, $2, $3} RETURNING id;`
    // RELATION => users & adress table => making query for adding in adresstable
    const insertaddressQuery = `INSERT INTO address {address,city,country,userid} VALUES {$1, $2, $3, $4};`

    // IF One Runs and Other Fails => First One Revert Back => Both Fails
    // WRAPPED Inside Transaction => 2 SQL Query Both Runs or Both Fails
    await pgClient.query("BEGIN;") // Start of Transaction

    const response = await pgClient.query(insertQuery, [username, email, password]);

    const userid = response.rows[0].id;

    const adddress_response = await pgClient.query(insertaddressQuery, [address, city, country, userid]);

    await pgClient.query("COMMIT;") // END of Transaction


 // SQL for users Data Table => Not TypeScript or JS  
 CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL

    );
CREATE TABLE address(
        address VARCHAR(100) UNIQUE NOT NULL,
        userid VARCHAR(50) NOT NULL, // Stroing Relation of users Table i.e id
        FOREIGN KEY(userid) REFRENCES users(id) ON DELETE CASCADE
        // This userid is storing relation i.e Foreign Key to users Datatable
        // Here userid is toring not any random valyuue but only id of users Table it is Refering to
        // ON DELETE CASCADE => Entry from user deleted then befoe all Relation is Deleted
    );
}
// Join Concept => UseCase and Significance

async function main3() {

    app.get("/metadata", async (req, res) => {

        const id = req.query.id;

        // To Get Data we do Read operation i.e SELECT * / {}
        const query1 = `SELECT {username, email, password} FROM users WHERE id = $1`;
        const response1 = await pgClient.query(query1, [id]);

        const query2 = `SELECT {addres,city,country} FROM address WHERE userid = $2`;
        const response2 = await pgClient.query(query2, [id]); // When Query Done we get response

        res.json({
            user: response1.rows[0],
            address: response2.rows
        })
    })

    // Not Send 2 Seperate Queries to 2 DataTable => Joints => Joining Them
    // How Do I get EveryThing in Single Query => Joints 

    // SOL Query for JOINTS => users & address is DataTable we acces column by users.
    app.get("/better-metadata", async (req, res) => {

        const id = req.query.id;
        const joinQuery = `SELECT users.username, users.email, users.password, address.address, address.city, address.country
             FROM users
             JOIN address ON users.id = address.userid
             WHERE users.id = $1`;
        //Specify Joining on Basis of Which Column/Field => ON 
        // not only FROM users => But FROM users join address
        // This Creates new DataTable which Merges Table if user.id = address.useeriid

        // To Avoid SQL Inject => First we pass Dyanmic Variable/Filler $1
        const response3 = await pgClient.query(joinQuery, [id]);

        res.json({
            response: response3.rows
        })

    });
    app.listen(3000);