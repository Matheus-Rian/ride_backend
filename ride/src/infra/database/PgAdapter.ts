import { Pool, PoolClient } from "pg";
import DatabaseConnection from "./DatabaseConnection";

// Frameworks and Drivers
export default class PgaAdapter implements DatabaseConnection {
  private connection: Pool;
  constructor () {
    this.connection = new Pool({
      host: '0.0.0.0',
      port: 5433,
      user: 'root',
      password: 'root',
      database: 'ride',
    });
  }

  async query(statement: string, params: any): Promise<any> {
    const client = await this.connection.connect();
    const result = await client.query(statement, params);
    this.close(client);
    return result;
  }
  async close(clientPool: PoolClient | null = null): Promise<void> {
    if (!clientPool)
      return;

    clientPool.release();
  }
}