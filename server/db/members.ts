import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;

export const queryAll = async (page: number, size: number) => {
  const rows = await db
    .select()
    .from(members)
    .limit(size)
    .offset((page - 1) * size);
  const total = await db.select({ count: count() }).from(members);
  return { rows, total: total[0].count}
};

export const queryByUserName = async (username: string) =>
  await db.select().from(members).where(eq(members.username, username));

export const create = async (newUser: NewMember) =>
  await db
    .insert(members)
    .values(newUser)
    .returning({ username: members.username });

export const updateById = async (id: number, updatedUser: Member) =>
  await db
    .update(members)
    .set(updatedUser)
    .where(eq(members.id, id))
    .returning({ id: members.id, username: members.username });

export const activate = async (id: number) =>
  await db
    .update(members)
    .set({ isActive: true, updatedAt: new Date() })
    .where(eq(members.id, id))
    .returning({ id: members.id });

export const ban = async (id: number) =>
  await db
    .update(members)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(members.id, id))
    .returning({ id: members.id });
