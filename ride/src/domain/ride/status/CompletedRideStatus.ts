import Ride from "../Ride";
import RideStatus from "./RideStatus";

export default class CompletedRideStatus extends RideStatus {
  value: string;
  constructor (ride: Ride) {
    super(ride);
    this.value = 'completed'
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
    throw new Error("Invalid Status");
  }

}