import { Pool } from "pg";
import { UUID } from "./models/uuid";
import { PassengerRepository } from "../repository/PassengerRepository";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export class GetPassenger {
  constructor (readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passengerData = await this.passengerRepository.get(input.passengerId);
    return {
      passengerId: passengerData[0].passenger_id,
      name: passengerData[0].name,
      email: passengerData[0].email,
      document: passengerData[0].document
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