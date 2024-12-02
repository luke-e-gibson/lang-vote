"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";
import { unstable_cache } from "next/cache";

async function getUser(browserId: string) {
  return await db.query.voters.findFirst({
    where: eq(schema.voters.browserId, browserId),
  });
}
async function getLangs() {
  const langs = await db.query.langs.findMany();
  return langs.map((lang) => {
    return {
      id: lang.id,
      name: lang.name,
      description: lang.description,
    };
  });
}

export async function registerUser(browserId: string) {
  const user = await db.query.voters.findFirst({
    where: eq(schema.voters.browserId, browserId),
  });
  if (user) throw new Error("User already exists");

  await db.insert(schema.voters).values({ browserId: browserId });
  return true;
}

export async function registerLang(
  lang: { name: string; description: string },
  browserId: string,
) {
  const voter = await db.query.voters.findFirst({
    where: eq(schema.voters.browserId, browserId),
  });
  if (!voter?.id) throw new Error("Could not find voter");

  if (voter.createdLang) {
    return { error: "User All ready created lang" };
  } else {
    await db.insert(schema.langs).values({ ...lang });
    await db
      .update(schema.voters)
      .set({ createdLang: true })
      .where(eq(schema.voters.browserId, browserId));
  }
}

export async function castVote(browserId: string, langId: number) {
  const voter = await db.query.voters.findFirst({
    where: eq(schema.voters.browserId, browserId),
  });
  if (!voter?.id) throw new Error("Could not find voter");

  if (voter.hasVoted) {
    return { error: "Can not vote twice" };
  } else {
    await db.insert(schema.votes).values({ langId: langId, voterId: voter.id });
    await db
      .update(schema.voters)
      .set({ hasVoted: true })
      .where(eq(schema.voters.browserId, browserId));

    return { message: "has voted" };
  }
}

async function getUsersVotedNumber() {
  return db.query.voters.findMany({ where: eq(schema.voters.hasVoted, true) });
}

async function getUserNotVotedNumber() {
  return db.query.voters.findMany({ where: eq(schema.voters.hasVoted, false) });
}

async function getUserNumber() {
  return db.query.voters.findMany({});
}

async function getVotes() {
  return await db.query.votes.findMany();
}

async function getVotesForLanguage(langID: number) {
  return await db.query.votes.findMany({where: eq(schema.votes.langId, langID)})
}

export const cached_getUser = unstable_cache(getUser, ["cached_getUser"], {
  revalidate: 7200,
});

export const cached_getLangs = unstable_cache(getLangs, ["cached_getLangs"], {
  revalidate: 7200,
});

export const cached_getUserNotVotedNumber = unstable_cache(
  getUserNotVotedNumber,
  ["cached_getUserNotVotedNumber"],
  { revalidate: 120 },
);

export const cached_getUserNumber = unstable_cache(
  getUserNumber,
  ["cached_getUserNumber"],
  { revalidate: 120 },
);

export const cached_getVotesForLanguage = unstable_cache(
  getVotesForLanguage,
  ["cached_getVotesForLanguage"],
  { revalidate: 120 },
);

export const cached_getVotes = unstable_cache(getVotes, ["cached_getVotes"], {
  revalidate: 120,
});

export const cached_getUsersVotedNumber = unstable_cache(
  getUsersVotedNumber,
  ["cached_getUsersVotedNumber"],
  { revalidate: 120 },
);