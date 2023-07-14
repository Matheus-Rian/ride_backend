import { CalculateRide } from "../../src/application/usecase/CalculateRide";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
  // given
  const input = {
    segments: [
      { distance: 10, date: new Date("2021-03-01T10:00:00") }
    ]
  };
  // when
  const usecase = new CalculateRide();
  const output = await usecase.execute(input);
  // then
  expect(output.price).toBe(21);
});