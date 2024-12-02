"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { load } from "@fingerprintjs/fingerprintjs";
import { registerUser } from "@/server/queries";

export default function UserTracking() {
  const [allowedFingerPrinting] = useLocalStorage("allowsFingerprint", false);

  async function browserId() {
    const fingerprint = await load()
    const result = await fingerprint.get()
    console.log(`Fingerprint Id: ${result.visitorId} Confidence Score: ${result.confidence.score} Confidence Comment: ${result.confidence.comment}`)
    void writeStorage("allowsFingerprint", true)
    void writeStorage("fingerprint", result.visitorId)
    await registerUser(result.visitorId)
  }

  return (
    <Dialog open={!allowedFingerPrinting}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>To Vote we need to fingerprint this browser</DialogTitle>
          <DialogDescription>
            To continue we need to generate a browser fingerprint to stop system abuse and unnecessary system strain. This fingerprint will be stored anonymous in our database.
          </DialogDescription>
          <div className="py-3 flex justify-between">
            <Button variant="outline" onClick={()=> window.close()}>Exit</Button>
            <Button onClick={browserId}>Continue</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}