// Membuat fixtures/video-contoh.webm: animasi kanvas 2 detik yang direkam
// dengan MediaRecorder Chromium (VP8/VP9 dalam kontainer WebM). Video lalu
// dimuat ulang di elemen <video> untuk memastikan berkas dapat dibaca.
import { writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent("<!doctype html><canvas id='c' width='160' height='120'></canvas>");

const base64 = await page.evaluate(async () => {
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const stream = canvas.captureStream(15);
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  const chunks = [];
  recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
  const stopped = new Promise((resolve) => (recorder.onstop = resolve));
  recorder.start(250);
  const start = performance.now();
  await new Promise((resolve) => {
    function frame() {
      const t = (performance.now() - start) / 1000;
      ctx.fillStyle = `hsl(${(t * 180) % 360}, 70%, 45%)`;
      ctx.fillRect(0, 0, 160, 120);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("UTS", 20 + t * 40, 60);
      ctx.fillText("KRIPTO", 30, 100 - t * 20);
      if (t < 2) requestAnimationFrame(frame);
      else resolve();
    }
    frame();
  });
  recorder.stop();
  await stopped;
  const blob = new Blob(chunks, { type: "video/webm" });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
});

const bytes = Buffer.from(base64, "base64");
writeFileSync("fixtures/video-contoh.webm", bytes);

// Verifikasi: video dapat dimuat dan memiliki dimensi.
const check = await page.evaluate(async (b64) => {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([arr], { type: "video/webm" }));
  const video = document.createElement("video");
  video.src = url;
  await new Promise((resolve, reject) => {
    video.onloadeddata = resolve;
    video.onerror = () => reject(new Error("video tidak dapat dimuat"));
  });
  return { width: video.videoWidth, height: video.videoHeight };
}, base64);

console.log(`video-contoh.webm: ${bytes.length} byte, ${check.width}x${check.height}`);
await browser.close();
