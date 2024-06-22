import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { count, eq, desc, like, and } from "drizzle-orm";

export type Member = typeof members.$inferSelect;
export type NewMember = Omit<
  typeof members.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;

export const queryAll = async (page: number, size: number) => {
  const rows = await db
    .select()
    .from(members)
    .limit(size)
    .offset((page - 1) * size)
    .where(eq(members.isDelete, false))
    .orderBy(desc(members.updatedAt));
  const total = await db.select({ count: count() }).from(members).where(eq(members.isDelete, false));
  return { rows, total: total[0].count };
};

export const queryByUserName = async (
  page: number,
  size: number,
  username: string
) => {
  const rows = await db
    .select()
    .from(members)
    .limit(size)
    .offset((page - 1) * size)
    .where(and(like(members.username, `%${username}%`), eq(members.isDelete, false)))
    .orderBy(desc(members.updatedAt));
  const total = await db
    .select({ count: count() })
    .from(members)
    .where(and(like(members.username, `%${username}%`), eq(members.isDelete, false)));
  return { rows, total: total[0].count };
};

export const create = async (newUser: NewMember) =>
  await db.insert(members).values(newUser).returning({ id: members.id });

export const updateById = async (id: number, updatedUser: NewMember) =>
  await db
    .update(members)
    .set({ ...updatedUser, updatedAt: new Date() })
    .where(eq(members.id, id))
    .returning({ id: members.id });

export const safyDeleteById = async (id: number) =>
  await db
    .update(members)
    .set({ isDelete: true, updatedAt: new Date() })
    .where(eq(members.id, id))
    .returning({ id: members.id });

export const deleteById = async (id: number) =>
  await db
    .delete(members)
    .where(eq(members.id, id))
    .returning({ deletedId: members.id });

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
