import { isValidCpf } from "../../CpfValidator";
import crypto from 'crypto';
import { UUID } from "./models/uuid";
import { PassengerRepository } from "../repository/PassengerRepository";

export class CreatePassenger {
  constructor (readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passengerId = crypto.randomUUID();
		if (!isValidCpf(input.document)) throw new Error('Invalid Cpf.')
    await this.passengerRepository.save(Object.assign(input, { passengerId }));
	
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