import { Pool } from "pg";
import { DriverRepository } from "../../application/repository/DriverRepository";

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

export default class DriverRepositoryDatabase implements DriverRepository {
  constructor () {}

  async save(driver: any) {
    const client = await pool.connect();
		const query = 'INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)';
		const values = [driver.driverId, driver.name, driver.email, driver.document, driver.carPlate];
    await client.query(query, values);
    client.release();	
  }

  async get(driverId: string) {
    const client = await pool.connect();
    const { rows: driverData } = await client.query(
      "SELECT * FROM cccat12.driver WHERE driver_id = $1",
      [driverId]
    );
    
    client.release();
    return driverData;
  } 
} 