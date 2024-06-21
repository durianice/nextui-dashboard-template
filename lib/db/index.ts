import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";

let dbInstance;

if (!dbInstance) {
  const client = postgres(process.env.POSTGRES_URL ?? "");
  dbInstance = drizzle(client, { schema, logger: false });
}

export const db = dbInstance;
