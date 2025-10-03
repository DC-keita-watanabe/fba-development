import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// 環境変数チェック
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// PostgreSQLコネクションプールを作成
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 10000,
});

// Drizzleインスタンスをエクスポート
export const db = drizzle(pool, { schema });