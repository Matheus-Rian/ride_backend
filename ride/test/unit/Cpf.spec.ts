import Cpf from "../../src/domain/Cpf";

describe('CPF', () => {
  // All tests have three points: given, when, then
  test.each([
    '',
    '1234545',
    '111.111.111-111',
    '111.111.111-11'
  ])('Should return false when cpf invalid', (value: string) => {
    expect(() => new Cpf(value)).toThrow(new Error('Invalid Cpf.'));
  });

  test.each([
    '625.332.890-51'
  ])('Should return true when cpf is valid', (value) => {
    // when 
    const cpf = new Cpf(value);
    // then
    expect(cpf.value).toBe(value);
  });
})