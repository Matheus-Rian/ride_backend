import Driver from "../../domain/driver/Driver"
import { UUID } from "../usecase/models/uuid"

export interface DriverRepository {
  save(driver: Driver): Promise<void>
  get(driverId: UUID | string): Promise<Driver>
}