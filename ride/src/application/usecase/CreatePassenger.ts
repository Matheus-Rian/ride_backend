import { Pool } from "pg";
import { isValidCpf } from "../../CpfValidator";
import crypto from 'crypto';
import { UUID } from "./models/uuid";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export class CreatePassenger {
  constructor () {}

  async execute(input: Input): Promise<Output> {
	  const client = await pool.connect();
    const passengerId = crypto.randomUUID();
		if (!isValidCpf(input.document)) throw new Error('Invalid Cpf.')
		const query = 'INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)';
		const values = [passengerId, input.name, input.email, input.document];
	
		await client.query(query, values);
		client.release();	
	
		return {
			passengerId
		};
  }
}

type Input = {
  name: string,
  email: string,
  document: string,
}

type Output = {
  passengerId: UUID,
}