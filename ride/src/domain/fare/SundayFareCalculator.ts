import FareCalculator from "./FareCalculator";
import Segment from "../ride/Segment";

export default class SundayFareCalculator implements FareCalculator {
  private readonly FARE = 2.9;

  calculate(segment: Segment) {
    return segment.distance * this.FARE;
  }
}