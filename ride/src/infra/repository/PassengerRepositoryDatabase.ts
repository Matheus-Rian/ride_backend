import { Pool } from "pg";
import { PassengerRepository } from "../../application/repository/PassengerRepository";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export default class PassengerRepositoryDatabase implements PassengerRepository {
  constructor () {}

  async save(passenger: any) {
    const client = await pool.connect();
    const query = 'INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)';
		const values = [passenger.passengerId, passenger.name, passenger.email, passenger.document];
	
		await client.query(query, values);
		client.release();	
  }

  async get(passengerId: string) {
    const client = await pool.connect();
    const { rows: passengerData } = await client.query(
      "SELECT * FROM cccat12.passenger WHERE passenger_id = $1",
      [passengerId]
    );
    
    client.release();
    return passengerData;
  } 
} 