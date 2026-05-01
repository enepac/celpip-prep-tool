"use client";

import { useEffect, useRef, useState } from "react";
import { posthog } from "@/lib/posthog";
import type { CelpipScore } from "@/types/score";

const TASK_PROMPT =
  "Your friend was hired for a position at a software development company. Since she only recently graduated from university, this will be the first job she has ever had. Give her advice on how she should prepare for her first day at work.";

const PREP_SECONDS = 30;
const RECORD_SECONDS = 90;

const HARDCODED_SCORE: CelpipScore = {
  content: 8,
  vocabulary: 7,
  listenability: 8,
  task_fulfillment: 9,
  overall: 8,
  reasoning: "This is a placeholder score. Real Claude scoring lands at Step 3.",
};

type Stage = "prompt" | "prep" | "recording" | "transcribing" | "result";

export default function Task1Page() {
  const [stage, setStage] = useState<Stage>("prompt");
  const [countdown, setCountdown] = useState(PREP_SECONDS);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const sessionId = useRef(crypto.randomUUID());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function track(event: string, props?: Record<string, unknown>) {
    posthog.capture(event, { session_id: sessionId.current, ...props });
  }

  // Fire session_start on mount
  useEffect(() => {
    track("session_start");
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state !== "inactive") {
        mediaRecorderRef.current?.stop();
      }
    };
  }, []);

  function startPrep() {
    setStage("prep");
    setCountdown(PREP_SECONDS);
    track("task_started");

    let remaining = PREP_SECONDS;
    timerRef.current = setInterval(() => {
      remaining--;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        startRecording();
      }
    }, 1000);
  }

  async function startRecording() {
    setStage("recording");
    setCountdown(RECORD_SECONDS);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/webm";
        if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = "";
      }

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        track("audio_record_completed", { duration_seconds: RECORD_SECONDS - countdown });
        uploadAndTranscribe(blob, recorder.mimeType);
      };

      recorder.start(100);
      track("audio_record_started");

      let remaining = RECORD_SECONDS;
      timerRef.current = setInterval(() => {
        remaining--;
        setCountdown(remaining);
        if (remaining <= 0) {
          clearInterval(timerRef.current!);
          recorder.stop();
        }
      }, 1000);
    } catch {
      setError("Microphone access denied or unavailable. Please allow microphone access and try again.");
      setStage("prompt");
    }
  }

  function stopEarly() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
    }
  }

  async function uploadAndTranscribe(blob: Blob, mimeType: string) {
    setStage("transcribing");
    setError("");

    try {
      const formData = new FormData();
      const ext = mimeType.includes("ogg") ? "ogg" : "webm";
      formData.append("audio", blob, `recording.${ext}`);

      const res = await fetch("/api/transcribe", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Transcription failed");
      }

      setTranscript(data.transcript ?? "");
      track("transcription_completed", { transcript_length_chars: (data.transcript ?? "").length });
      setStage("result");
      track("score_displayed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transcription failed. Please try again.");
      setStage("prompt");
    }
  }

  function restart() {
    setStage("prompt");
    setTranscript("");
    setError("");
    setCountdown(PREP_SECONDS);
    sessionId.current = crypto.randomUUID();
    track("session_start");
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-start px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-1 text-white">CELPIP Speaking Practice</h1>
        <p className="text-gray-400 text-sm mb-8">Task 1 — Giving Advice</p>

        {/* PROMPT stage */}
        {stage === "prompt" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wide">Task Prompt</p>
              <p className="text-gray-100 leading-relaxed text-lg">{TASK_PROMPT}</p>
            </div>
            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            <div className="text-gray-400 text-sm space-y-1">
              <p>• You will have <strong className="text-white">30 seconds</strong> to prepare.</p>
              <p>• Then you will have <strong className="text-white">90 seconds</strong> to speak.</p>
            </div>
            <button
              onClick={startPrep}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Start Preparation
            </button>
          </div>
        )}

        {/* PREP stage */}
        {stage === "prep" && (
          <div className="space-y-6 text-center">
            <div className="bg-gray-800 rounded-lg p-6 text-left">
              <p className="text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wide">Task Prompt</p>
              <p className="text-gray-100 leading-relaxed">{TASK_PROMPT}</p>
            </div>
            <div className="bg-yellow-900/40 border border-yellow-700 rounded-lg p-8">
              <p className="text-yellow-300 text-sm font-semibold uppercase tracking-wide mb-3">Preparation Time</p>
              <p className="text-7xl font-mono font-bold text-yellow-300">{countdown}</p>
              <p className="text-yellow-400 mt-2">Recording starts automatically</p>
            </div>
          </div>
        )}

        {/* RECORDING stage */}
        {stage === "recording" && (
          <div className="space-y-6 text-center">
            <div className="bg-red-900/40 border border-red-700 rounded-lg p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-300 text-sm font-semibold uppercase tracking-wide">Recording</p>
              </div>
              <p className="text-7xl font-mono font-bold text-red-300">{countdown}</p>
              <p className="text-red-400 mt-2">seconds remaining</p>
            </div>
            <button
              onClick={stopEarly}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Stop Recording Early
            </button>
          </div>
        )}

        {/* TRANSCRIBING stage */}
        {stage === "transcribing" && (
          <div className="text-center space-y-4 py-16">
            <div className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-xl text-gray-300">Transcribing your response...</p>
            </div>
            <p className="text-gray-500 text-sm">This takes a few seconds</p>
          </div>
        )}

        {/* RESULT stage */}
        {stage === "result" && (
          <div className="space-y-6">
            {/* Disclaimer — non-negotiable, always visible */}
            <div className="bg-amber-900/40 border border-amber-600 rounded-lg p-4">
              <p className="text-amber-300 font-semibold text-sm">
                ⚠ PRACTICE ONLY — Not an official CELPIP score. This AI feedback is for practice purposes only and does not reflect your actual CELPIP exam performance. Real AI scoring activates at Step 3.
              </p>
            </div>

            {/* Transcript */}
            <div className="bg-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wide">Your Transcript</p>
              <p className="text-gray-100 leading-relaxed">
                {transcript || <span className="text-gray-500 italic">No speech detected</span>}
              </p>
            </div>

            {/* Scores */}
            <div className="bg-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400 mb-4 font-semibold uppercase tracking-wide">Practice Scores</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <ScoreCard label="Content / Coherence" value={HARDCODED_SCORE.content} />
                <ScoreCard label="Vocabulary" value={HARDCODED_SCORE.vocabulary} />
                <ScoreCard label="Listenability" value={HARDCODED_SCORE.listenability} />
                <ScoreCard label="Task Fulfillment" value={HARDCODED_SCORE.task_fulfillment} />
              </div>
              <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                <span className="text-gray-300 font-semibold">Overall (estimated)</span>
                <span className="text-3xl font-bold text-white">{HARDCODED_SCORE.overall} / 12</span>
              </div>
            </div>

            {/* Reasoning */}
            <div className="bg-gray-800 rounded-lg p-5">
              <p className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">Feedback</p>
              <p className="text-gray-300 italic">{HARDCODED_SCORE.reasoning}</p>
            </div>

            <button
              onClick={restart}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 flex flex-col gap-1">
      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-white">{value}<span className="text-gray-500 text-sm font-normal"> / 12</span></span>
    </div>
  );
}
