import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const GOOGLE_API = process.env.GOOGLE_API;

const ai = new GoogleGenAI({ apiKey: GOOGLE_API });

async function getResponse(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text
  });
  return response.text
}

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
    const response = await getResponse(body)

    return NextResponse.json({ returned: response }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}