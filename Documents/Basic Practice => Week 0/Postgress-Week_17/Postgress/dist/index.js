import { Client } from "pg";
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
});
// It is Async Function to connect with neon_db it Takes Time => we await
async function main() {
    await pgClient.connect();
    // Can Send all SQL Queries via Instance of Client class i.e pgClient to postgres db
    // Read from users DataTable the entire row
    const response = await pgClient.query("SELECT * FROM users;");
    console.log(response.rows);
    // Update into users DataTable 
    const response2 = await pgClient.query("UPDATE users SET username = 'AnshuJha' WHERE password = '14J'; ");
    console.log(response2.rows);
    // Now For CRUD into Different DataTable We just mention Table Name in Query
    // Since I have Already Connected to Neon DataBase via Client class i.e pgClient.connecct()
    // Inserted into Todo Table
    const add_todo = await pgClient.query("INSERT INTO todos (title, description, done) VALUES('Reading', '5 to 6', 'false') )");
}
// Must call This Fucntion Then ONly what Inside Functon will be Executed 
main();
//# sourceMappingURL=index.js.map