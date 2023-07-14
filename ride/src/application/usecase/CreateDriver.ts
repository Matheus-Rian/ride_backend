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

export class CreateDriver {
  constructor () {}

  async execute(input: Input): Promise<Output> {
	  const client = await pool.connect();
    const driverId = crypto.randomUUID();
		if (!isValidCpf(input.document)) throw new Error('Invalid Cpf.')
		const query = 'INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)';
		const values = [driverId, input.name, input.email, input.document, input.carPlate];
	
		await client.query(query, values);
	
    client.release();	
	
		return {
			driverId
		};
  }
}

type Input = {
  name: string,
  email: string,
  document: string,
  carPlate: string,
}

type Output = {
  driverId: UUID,
}
