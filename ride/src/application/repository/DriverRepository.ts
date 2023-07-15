export interface DriverRepository {
  save(driver: any): Promise<void>
  get(driverId: any): Promise<any>
}