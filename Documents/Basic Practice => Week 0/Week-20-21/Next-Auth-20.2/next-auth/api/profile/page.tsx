import { NextRequest, NextResponse } from "next/server";

{ NextRequest }

async function GET(req: NextRequest) {
    const heaaders = req.header;
    const authorizat = headers("authorization");
    const decoded = Jwt.deco de(authorization, "SECRET")
cosnt userId = decode.userId;
}

return (NextResponse.json({
    url: "http://images.google.com/"
}))