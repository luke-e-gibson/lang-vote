"use client"
import { load } from "@fingerprintjs/fingerprintjs"
export default function HomePage() {

  async function browserId() {
    const fingerprint = await load()
    const userId = await fingerprint.get()
    console.log(`Fingerprint Id: ${userId.visitorId} Confidence Score: ${userId.confidence.score} Confidence Comment: ${userId.confidence.comment}`)
  }

  return (
    <main className="">
      <button onClick={browserId}>Open</button>
    </main>
  );
}
