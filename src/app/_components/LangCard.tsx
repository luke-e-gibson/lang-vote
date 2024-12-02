"use client"

import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { cached_getUser, castVote} from "@/server/queries";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function LangCard({ lang }: { lang: { name: string; description: string, id: number, langVotes: number }}) {
  const [browserId] = useLocalStorage("fingerprint", "");
  const [hasVoted] = useLocalStorage("hasVoted", false);
  const router = useRouter();

  async function voteLang() {
    if(hasVoted) return
    if (browserId === "") throw new Error("No browser id");

    const user = await cached_getUser(browserId);
    if(!user?.id) throw new Error("User is not registered");
    await castVote(user.browserId, lang.id);
    void writeStorage("hasVoted", true)

    void router.refresh();
  }

  return (
    <Card className="mx-auto max-w-72 size-full min-w-48 ">
      <CardHeader>
        <CardTitle>{lang.name}</CardTitle>
        <CardDescription>{lang.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          Votes: {lang.langVotes}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={hasVoted} onClick={voteLang}>{!hasVoted ? "Vote" : "Cant vote"}</Button>
      </CardFooter>
    </Card>
  );
}