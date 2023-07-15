import CarPlate from "../../src/domain/CarPlate"

test('Should return TRUE when valid carPlate', () => {
  // given and when
  const carPlate = new CarPlate('AAA9999');
  // then
  expect(carPlate.value).toBeDefined();
})

test('Should return FALSE when invalid carPlate', () => {
  expect(() => new CarPlate('AAA999')).toThrow(new Error('Invalid car plate.'));
})