import { DriverRepository } from "../repository/DriverRepository";
import { UUID } from "./models/uuid";

export class GetDriver {
  constructor (readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driverData = await this.driverRepository.get(input.driverId);
    return {
      driverId: driverData[0].driver_id,
      name: driverData[0].name,
      email: driverData[0].email,
      document: driverData[0].document,
      carPlate: driverData[0].car_plate
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

