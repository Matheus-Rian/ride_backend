import FareCalculator from "./FareCalculator";
import Segment from "./Segment";

export default class OvernightSundayFareCalculator implements FareCalculator {
  private readonly FARE = 5;

  calculate(segment: Segment) {
    return segment.distance * this.FARE;
  }
}