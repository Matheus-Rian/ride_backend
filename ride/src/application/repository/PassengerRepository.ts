export interface PassengerRepository {
  save(passenger: any): Promise<void>
  get(passengerId: any): Promise<any>
}