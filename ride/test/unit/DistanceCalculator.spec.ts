import Coord from "../../src/domain/distance/Coord";
import DistanceCalculator from "../../src/domain/distance/DistanceCalculator";

test('Should calculate the distance beetween two coordinates', () => {
  const from = new Coord(-8.087602480277932, -34.94039886110192);
  const to = new Coord(-7.998906652322922, -34.97156026714327);
  const distance = DistanceCalculator.calculate(from, to);
  expect(distance).toBe(10);
})