"use server"

import {
  cached_getLangs,
  cached_getUserNumber, cached_getVotesForLanguage
} from "@/server/queries";
import { LangCard } from "./_components/LangCard";
import { AddLangDialog } from "@/app/_components/AddLangDialog";

export default async function HomePage() {
  const [langs, userVoted] = await Promise.all([ cached_getLangs(), cached_getUserNumber()] );

  return (
    <main className="mx-auto max-w-7xl rounded border py-5">
      <div className="flex justify-between px-2 py-2">
        <div className="flex justify-between px-2 gap-5">
          <div>{userVoted.length} People Voted</div>
          <div className="px-4 text-sm">Information is delayed by caching responses on the server. 2 minutes for vote numbers and 2 hours for language selection. You can only vote once</div>
        </div>
        <AddLangDialog/>
      </div>
      <div className="grid grid-flow-row md:grid-flow-row grid-cols-4 gap-5">
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
