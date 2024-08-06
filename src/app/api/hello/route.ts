// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";

type Data = {
    name: string;
};

export async function GET(
    request: NextRequest,
    response: NextResponse<Data>
) {
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
