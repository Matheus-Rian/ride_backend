import { Pool } from "pg";
import { UUID } from "./models/uuid";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export class GetPassenger {
  constructor () {}

  async execute(input: Input): Promise<Output> {
    const client = await pool.connect();
    const { rows } = await client.query(
      "SELECT * FROM cccat12.passenger WHERE passenger_id = $1",
      [input.passengerId]
    );
    
    client.release();
    return {
      passengerId: rows[0].passenger_id,
      name: rows[0].name,
      email: rows[0].email,
      document: rows[0].document
    };
  }
}

type Input = {
  passengerId: UUID
}

type Output = {
  passengerId: UUID,
  name: string,
  email: string,
  document: string
}