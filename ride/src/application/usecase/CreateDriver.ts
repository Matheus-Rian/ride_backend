import { Pool } from "pg";
import { isValidCpf } from "../../CpfValidator";
import crypto from 'crypto';
import { UUID } from "./models/uuid";
import { DriverRepository } from "../repository/DriverRepository";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export class CreateDriver {
  constructor (readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driverId = crypto.randomUUID();
		if (!isValidCpf(input.document)) throw new Error('Invalid Cpf.')
    await this.driverRepository.save(Object.assign(input, { driverId }));
	
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
