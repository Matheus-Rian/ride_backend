import Ride from "../Ride";
import InProgressRideStatus from "./InProgressRideStatus";
import RideStatus from "./RideStatus";

export default class AcceptedRideStatus extends RideStatus {
  value: string;
  constructor (ride: Ride) {
    super(ride);
    this.value = 'accepted'
  }

  request(): void {
    throw new Error("Invalid Status");
  }

  accept(): void {
    throw new Error("Invalid Status");
  }

  start(): void {
    this.ride.status = new InProgressRideStatus(this.ride);
  }

  end(): void {
    throw new Error("Invalid Status");
  }

}