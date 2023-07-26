import { CalculateRide } from "../../src/application/usecase/CalculateRide";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
  // given
  const input = {
    positions: [
      { lat: -8.087602480277932, long: -34.94039886110192, date: new Date("2021-03-01T10:00:00") },
      { lat: -7.998906652322922, long: -34.97156026714327, date: new Date("2021-03-01T10:00:00") },
    ]
  };
  // when
  const usecase = new CalculateRide();
  const output = await usecase.execute(input);
  // then
  expect(output.price).toBe(21);
});