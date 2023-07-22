import { PassengerRepository } from "../../application/repository/PassengerRepository";
import { UUID } from "../../application/usecase/models/uuid";
import Passenger from "../../domain/Passenger";
import DatabaseConnection from "../database/DatabaseConnection";

export default class PassengerRepositoryDatabase implements PassengerRepository {
  constructor (readonly connection: DatabaseConnection) {}

  async save(passenger: Passenger) {
    const query = 'INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)';
		const values = [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value];
	
		await this.connection.query(query, values);
  }

  async get(passengerId: UUID): Promise<Passenger> {
    const { rows: passengerData } = await this.connection.query(
      "SELECT * FROM cccat12.passenger WHERE passenger_id = $1",
      [passengerId]
    );
    
    return new Passenger(
      passengerData[0].passenger_id,
      passengerData[0].name,
      passengerData[0].email,
      passengerData[0].document,
    );
  } 
} 