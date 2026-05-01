import "server-only";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audio");

    if (!audioBlob || !(audioBlob instanceof Blob)) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const arrayBuffer = await audioBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Detect extension from content type to satisfy Whisper's filename requirement
    const contentType = audioBlob.type || "audio/webm";
    const ext = contentType.includes("ogg") ? "ogg" : "webm";
    const file = new File([buffer], `recording.${ext}`, { type: contentType });

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file,
    });

    return NextResponse.json({ transcript: transcription.text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transcription failed";
    console.error("[/api/transcribe]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
