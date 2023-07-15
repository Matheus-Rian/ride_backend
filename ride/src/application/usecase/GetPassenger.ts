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
    const passenger = await this.passengerRepository.get(input.passengerId);
    return {
      passengerId: passenger.passengerId,
      name: passenger.name,
      email: passenger.email.value,
      document: passenger.document.value
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