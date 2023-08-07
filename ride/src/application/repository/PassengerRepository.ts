import Passenger from "../../domain/passenger/Passenger"
import { UUID } from "../usecase/models/uuid"

export interface PassengerRepository {
  save(passenger: Passenger): Promise<void>
  get(passengerId: UUID | string): Promise<Passenger>
}