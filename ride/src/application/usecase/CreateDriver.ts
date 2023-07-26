import { Pool } from "pg";
import { UUID } from "./models/uuid";
import { DriverRepository } from "../repository/DriverRepository";
import Driver from "../../domain/driver/Driver";

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
    const driver = Driver.create(input.name, input.email, input.document, input.carPlate);
    await this.driverRepository.save(driver);
	
		return {
			driverId: driver.driverId
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
