import { Pool } from "pg";
import { DriverRepository } from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";
import { UUID } from "../../application/usecase/models/uuid";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export default class DriverRepositoryDatabase implements DriverRepository {
  constructor () {}

  async save(driver: Driver) {
    const client = await pool.connect();
		const query = 'INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)';
		const values = [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value];
    await client.query(query, values);
    client.release();	
  }

  async get(driverId: UUID): Promise<Driver> {
    const client = await pool.connect();
    const { rows: driverData } = await client.query(
      "SELECT * FROM cccat12.driver WHERE driver_id = $1",
      [driverId]
    );
    
    client.release();
    return new Driver(
      driverData[0].driver_id,
      driverData[0].name,
      driverData[0].email,
      driverData[0].document,
      driverData[0].car_plate,
    );
  } 
} 