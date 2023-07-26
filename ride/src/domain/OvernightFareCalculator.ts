import FareCalculator from "./FareCalculator";
import Segment from "./Segment";

export default class OvernightFareCalculator implements FareCalculator {
  private readonly FARE = 3.9;

  calculate(segment: Segment) {
    return segment.distance * this.FARE;
  }
}