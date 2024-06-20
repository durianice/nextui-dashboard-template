import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from './index';

migrate(db, { migrationsFolder: "./drizzle" })
  .then(async () => {
    await client.end();
  })
  .catch(async (err) => {
    console.error(err);
    await client.end();
    process.exit(1);
  });
