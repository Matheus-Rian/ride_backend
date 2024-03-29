import Segment from "../../ride/Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class OvernightSundayFareCalculatorHandler implements FareCalculatorHandler {
  private readonly FARE = 5;

  constructor (readonly next?: FareCalculatorHandler) {}

  handle(segment: Segment): number {
    if (segment.isOvernight() && segment.isSunday()) {
      return segment.distance * this.FARE;
    }
    if (!this.next) throw new Error('End of chain');
    return this.next.handle(segment);
  }
}