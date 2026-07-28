import PrismaClient = require("./generated/prisma/client");
import express from "express";

const client = new PrismaClient();

const app = express();

// Client is made on The Basis of Schema Only  
// It Knows User and Todo Exist as DataTsble
async function createUser() {
    await client.user.update({
        where: {
            id: 1
        },
        data: {
            username: "Harkirat"
        }
    })

    const user = await client.user.findFirst({
        where: {
            id: 100
        },

    })

    console.log(user?.password);

    // UseCae of Relation => I able to Get Todos Along With User Only
    const todo = await client.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    })

}

app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json({
        users
    })
})

app.get("/todos/:id", async (req, res) => {
    const id = req.params.id;

    const user = await client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            todos: true,
            username: true,
            password: true,
        }
    })

    res.json({
        user
    })
})



createUser();