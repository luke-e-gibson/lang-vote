"use client"

import { useLocalStorage } from "@rehooks/local-storage";
import { cached_getUser, castVote} from "@/server/queries";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function LangCard({ lang }: { lang: { name: string; description: string, id: number, langVotes: number }}) {
  const [browserId] = useLocalStorage("fingerprint", "");
  const router = useRouter();

  async function voteLang() {
    if (browserId === "") throw new Error("No browser id");

    const user = await cached_getUser(browserId);
    if(!user?.id) throw new Error("User is not registered");
    await castVote(user.browserId, lang.id);

    void router.refresh();
  }

  return (
    <Card className="mx-auto max-w-64 min-w-72">
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
        <Button className="w-full" onClick={voteLang}>Vote</Button>
      </CardFooter>
    </Card>
  );
}