import { NextRequest, NextResponse } from "next/server";

import dotenv from "dotenv";
dotenv.config();

const GOOGLE_API = process.env.GOOGLE_API;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${GOOGLE_API}`;


export async function GET() {
  try {
    return NextResponse.json({ returned: "hi there" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log(body);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "contents": [ { "parts": [ { "text": `${body}` } ] } ] }),
    })

    const data = await response.json();
    return NextResponse.json({ returned: data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}