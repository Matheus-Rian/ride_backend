import { Pool } from "pg";
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
    return client.query(statement, params);
  }
  async close(): Promise<void> {
    const client = await this.connection.connect();
    client.release();
  }
}