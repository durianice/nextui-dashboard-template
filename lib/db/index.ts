import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const dbConnectCache = globalThis as unknown as {
  connect: postgres.Sql | undefined;
  db: ReturnType<typeof drizzle> | undefined;
};

const client = dbConnectCache.connect ?? postgres(process.env.POSTGRES_URL ?? "");
const db = dbConnectCache.db ?? drizzle(client, { schema, logger: false });
if (process.env.NODE_ENV !== "production") {
  dbConnectCache.connect = client;
  dbConnectCache.db = db;
}

export { db, client };