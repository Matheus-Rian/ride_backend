import Passenger from "../../domain/Passenger"
import { UUID } from "../usecase/models/uuid"

export interface PassengerRepository {
  save(passenger: Passenger): Promise<void>
  get(passengerId: UUID): Promise<Passenger>
}