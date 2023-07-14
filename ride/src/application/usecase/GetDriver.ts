import { Pool } from "pg";
import { UUID } from "./models/uuid";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export class GetDriver {
  constructor () {}

  async execute(input: Input): Promise<Output> {
    const client = await pool.connect();
    const { rows } = await client.query(
      "SELECT * FROM cccat12.driver WHERE driver_id = $1",
      [input.driverId]
    );
    
    client.release();

    return {
      driverId: rows[0].driver_id,
      name: rows[0].name,
      email: rows[0].email,
      document: rows[0].document,
      carPlate: rows[0].car_plate
    };
  
  }
}

// DTO - Data Transfer Object
type Input = {
  driverId: UUID,
}

// DTO - Data Transfer Object
type Output = {
  driverId: UUID,
  name: string,
  email: string,
  document: string,
  carPlate: string,
}

