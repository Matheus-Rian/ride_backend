import { calculate } from "../../RideCalculator"

export class CalculateRide {
  constructor () {}

  async execute(input: Input): Promise<Output> {
    const price = calculate(input.segments);
    return {
      price
    }
  }
}
type Input = {
  segments: { distance: number, date: Date }[]
}

type Output = {
  price: number
}