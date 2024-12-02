"use server"

import {
  cached_getLangs,
  cached_getUserNumber, cached_getVotesForLanguage
} from "@/server/queries";
import { Button } from "@/components/ui/button";
import { LangCard } from "./_components/LangCard";

export default async function HomePage() {
  const [langs] = await Promise.all([ cached_getLangs()]);
  const [userVoted] = await Promise.all([cached_getUserNumber()])


  return (
    <main className="mx-auto max-w-7xl rounded border py-5">
      <div>Information is delayed by caching respones on the server end</div>
      <div className="flex justify-between px-2">
        <div className="flex justify-between px-2 gap-5">
          <div>{userVoted.length} People Voted</div>
        </div>
        <Button>Add Lang</Button>
      </div>
      <div className="grid grid-cols-4 gap-5 py-5">
        {langs.map(async (_lang) => {
          const votes = await cached_getVotesForLanguage(_lang.id)
          const lang = { ..._lang, langVotes: votes.length }
          return (
            <LangCard key={lang.id} lang={lang} />
          )
        })}
      </div>
    </main>
  );
}
