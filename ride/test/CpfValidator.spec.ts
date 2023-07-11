import { isValidLengthCpf, isValidCpf, hasAllDigitsEqualsInCpf } from "../src/CpfValidator"

describe('CPF', () => {
  // Branas 
  test.each([
    '',
    '1234545',
    '111.111.111-111',
    '111.111.111-11'
  ])('Should return false when cpf invalid', (cpf: string) => {
    const output = isValidCpf(cpf);
    expect(output).toBeFalsy();
  });

  // All tests have three points: given, when, then
  test('Should return true when isValidLengthCpf receive 11', () => {  
    // given
    const inputCpf = '11111111111';
    // when
    const output = isValidLengthCpf(inputCpf);
    // then 
    expect(output).toBeTruthy();
  });

  test('Should return false when isValidLengthCpf receive value different of 11', () => {  
    // given
    const inputCpf = '111.111.111-111';
    // when
    const output = isValidLengthCpf(inputCpf);
    // then 
    expect(output).toBe(false);
  });

  test('Should return true when hasAllDigitsEqualsInCpf receive a cpf all digits equals', () => {  
    // given
    const inputCpf = '11111111111';
    // when
    const output = hasAllDigitsEqualsInCpf(inputCpf);
    // then 
    expect(output).toBe(true);
  });

  test('Should return false when hasAllDigitsEqualsInCpf receive a cpf with digits differents', () => {  
    // given
    const inputCpf = '111.111.111-12';
    // when
    const output = hasAllDigitsEqualsInCpf(inputCpf);
    // then 
    expect(output).toBe(false);
  });

  test('Should return true when cpf is valid', () => {
    // given
    const inputCpf = '625.332.890-51';
    // when 
    const output = isValidCpf(inputCpf);
    // then
    expect(output).toBe(true);
  });

  test('Should return false when cpf is invalid', () => {
    // given
    const inputCpf = '600.002.890-21';
    // when 
    const output = isValidCpf(inputCpf);
    // then
    expect(output).toBe(false);
  });
})