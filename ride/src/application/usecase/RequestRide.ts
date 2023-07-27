import Coord from "../../domain/distance/Coord"
import Ride from "../../domain/ride/Ride"
import RideRepository from "../repository/RideRepository"

export class RequestRide {
  constructor (readonly rideRepository: RideRepository) {

  }

  async execute(input: Input): Promise<Output> {
    // Orquestrar a camada de entidades/Domínios
    const ride = Ride.create(
      input.passengerId, 
      new Coord(input.from.lat, input.from.long),
      new Coord(input.to.lat, input.to.long),
      input.date
    )
    await this.rideRepository.save(ride);

    return {
      rideId: ride.rideId,
    }
  }
}

type Input = {
  passengerId: string,
  from: {
    lat: number,
    long: number,
  },
  to: {
    lat: number,
    long: number,
  },
  date: Date
}

type Output = {
  rideId: string,
}