import Ride from "../Ride";
import CompletedRideStatus from "./CompletedRideStatus";
import RideStatus from "./RideStatus";

export default class InProgressRideStatus extends RideStatus {
  value: string;
  constructor (ride: Ride) {
    super(ride);
    this.value = 'in_progress'
  }

  request(): void {
    throw new Error("Invalid Status");
  }

  accept(): void {
    throw new Error("Invalid Status");
  }

  start(): void {
    throw new Error("Invalid Status");
  }
  
  end(): void {
    this.ride.status = new CompletedRideStatus(this.ride);
  }
}