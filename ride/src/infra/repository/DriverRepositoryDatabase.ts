import { DriverRepository } from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";
import { UUID } from "../../application/usecase/models/uuid";
import DatabaseConnection from "../database/DatabaseConnection";


// Interface Adapter
export default class DriverRepositoryDatabase implements DriverRepository {
  constructor (readonly connection: DatabaseConnection) {}

  async save(driver: Driver) {
		const query = 'INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)';
		const values = [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value];
    await this.connection.query(query, values);
  }

  async get(driverId: UUID): Promise<Driver> {
    const { rows: driverData } = await this.connection.query(
      "SELECT * FROM cccat12.driver WHERE driver_id = $1",
      [driverId]
    );
    
    return new Driver(
      driverData[0].driver_id,
      driverData[0].name,
      driverData[0].email,
      driverData[0].document,
      driverData[0].car_plate,
    );
  } 
} 