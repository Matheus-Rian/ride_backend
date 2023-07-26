import FareCalculator from "./FareCalculator";
import Segment from "../ride/Segment";

export default class NormalFareCalculator implements FareCalculator {
  private readonly FARE = 2.1;

  calculate(segment: Segment) {
    return segment.distance * this.FARE;
  }
}