import { Pool } from "pg";
import { PassengerRepository } from "../../application/repository/PassengerRepository";
import { UUID } from "../../application/usecase/models/uuid";
import Passenger from "../../domain/Passenger";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export default class PassengerRepositoryDatabase implements PassengerRepository {
  constructor () {}

  async save(passenger: Passenger) {
    const client = await pool.connect();
    const query = 'INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)';
		const values = [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value];
	
		await client.query(query, values);
		client.release();	
  }

  async get(passengerId: UUID): Promise<Passenger> {
    const client = await pool.connect();
    const { rows: passengerData } = await client.query(
      "SELECT * FROM cccat12.passenger WHERE passenger_id = $1",
      [passengerId]
    );
    
    client.release();
    return new Passenger(
      passengerData[0].passenger_id,
      passengerData[0].name,
      passengerData[0].email,
      passengerData[0].document,
    );
  } 
} 