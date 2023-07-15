import { DriverRepository } from "../repository/DriverRepository";
import { UUID } from "./models/uuid";

export class GetDriver {
  constructor (readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driver = await this.driverRepository.get(input.driverId);
    return {
      driverId: driver.driverId,
      name: driver.name,
      email: driver.email.value,
      document: driver.document.value,
      carPlate: driver.carPlate.value
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

