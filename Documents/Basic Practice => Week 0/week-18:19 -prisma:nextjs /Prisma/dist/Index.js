"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PrismaClient = require("./generated/prisma/client");
const client = new PrismaClient();
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
    });
    const user = await client.user.findFirst({
        where: {
            id: 100
        },
    });
    console.log(user?.password);
    // UseCae of Relation => I able to Get Todos Along With User Only
    const todo = await client.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    });
}
createUser();
//# sourceMappingURL=Index.js.map