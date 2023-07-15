import { UUID } from "./models/uuid";
import { PassengerRepository } from "../repository/PassengerRepository";
import Passenger from "../../domain/Passenger";

export class CreatePassenger {
  constructor (readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const { name, email, document } = input; 
    const passenger = Passenger.create(name, email, document);
    passenger.passengerId
    await this.passengerRepository.save(passenger);
	
		return {
      passengerId: passenger.passengerId
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