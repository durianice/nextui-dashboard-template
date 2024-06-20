import { boolean, pgEnum, pgTable, serial, text, timestamp, unique, integer } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["USER", "ADMIN"]);

export const members = pgTable(
    "members",
    {
      id: serial("id").primaryKey(),
      userid: text("user_id").notNull(),
      username: text("username").notNull(),
      nickName: text("nick_name").notNull(),
      expires: integer("expires_ts").notNull().default(0),
      role: userRole("role").notNull().default("USER"),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
      uniqueUsername: unique().on(table.username),
    }),
  );