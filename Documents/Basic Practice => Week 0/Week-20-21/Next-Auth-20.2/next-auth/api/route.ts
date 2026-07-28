import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    // Ideally we should check username and password in DB only if it is right 
    // We Should return the JWT
    const body = await req.json();

    const username = body.username;
    const password = body.password;

    // Check in the db => If username and password correct
    // Only if it is Correct get userid from a db , sign token and return  
    const userId = 1;
    const token = jwt.sign({
        userId
    }, "SECRET");

    return NextResponse.json({
        data: token
    });


}
