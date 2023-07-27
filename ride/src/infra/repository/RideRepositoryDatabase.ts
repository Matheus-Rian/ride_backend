import RideRepository from "../../application/repository/RideRepository";
import Coord from "../../domain/distance/Coord";
import Ride from "../../domain/ride/Ride";
import DatabaseConnection from "../database/DatabaseConnection";

export default class RideRepositoryDatabase implements RideRepository {
  constructor (readonly connection: DatabaseConnection) {}
  async save(ride: Ride): Promise<void> {
    await this.connection.query(
      "insert into cccat12.ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [ride.rideId, ride.passengerId, ride.from.lat, ride.from.long, ride.to.lat, ride.to.long, ride.status, ride.requestDate]
    );
  }
  async get(rideId: string): Promise<Ride> {
    const { rows: rideData } = await this.connection.query('select * from cccat12.ride where ride_id = $1', [rideId]);
    return new Ride(
      rideData[0].ride_id,
      rideData[0].passenger_id,
      new Coord(parseFloat(rideData[0].from_lat), parseFloat(rideData[0].from_long)),
      new Coord(parseFloat(rideData[0].to_lat), parseFloat(rideData[0].to_long)),
      rideData[0].status,
      rideData[0].request_date,
    )
  }
}