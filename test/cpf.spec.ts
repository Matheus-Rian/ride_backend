import { isValidLengthCpf, isValidCpf, hasNumbersEqualsInCpf } from "../src/cpf"

describe('CPF', () => {
  // All tests have three points: given, when, then
  test('Should return false when cpf equal null', () => {
    // given
    const inputCpf = null;
    // when
    const output = isValidCpf(inputCpf);
    // then 
    expect(output).toBe(false);
  });

  test('Should return false when cpf equal undefined', () => {  
    // given
    const inputCpf = undefined;
    // when
    const output = isValidCpf(inputCpf);
    // then 
    expect(output).toBe(false);
  });

  test('Should return true when isValidLengthCpf receive 11 or 14', () => {  
    // given
    const inputsCpf = ['111.111.111-11', '11.111.111/0001-12'];
    // when
    const output: boolean[] = [];
    for (let i = 0; i < inputsCpf.length; i++) {
      output.push(isValidLengthCpf(inputsCpf[i]));
    }
    // then 
    expect(output).toStrictEqual([true, true]);
  });

  test('Should return false when isValidLengthCpf receive value different of 11 or 14', () => {  
    // given
    const inputCpf = '111.111.111-111';
    // when
    const output = isValidLengthCpf(inputCpf);
    // then 
    expect(output).toBe(false);
  });

  test('Should return true when hasNumbersEqualsInCpf receive a cpf all digits equals', () => {  
    // given
    const inputCpf = '111.111.111-11';
    // when
    const output = hasNumbersEqualsInCpf(inputCpf);
    // then 
    expect(output).toBe(true);
  });

  test('Should return false when hasNumbersEqualsInCpf receive a cpf with digits differents', () => {  
    // given
    const inputCpf = '111.111.111-12';
    // when
    const output = hasNumbersEqualsInCpf(inputCpf);
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