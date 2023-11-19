import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()
    console.log(body)
    return NextResponse.json({ msg: 'not implemented yet' }, { status: 200 });
}