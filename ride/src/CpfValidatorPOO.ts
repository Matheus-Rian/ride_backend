export default class Cpf {
  value: string;

  constructor (value: string) {
    if (!this.validate(value)) throw new Error('Invalid Cpf.');
    this.value = value;
  }

  private validate(cpf: string) {
    cpf = this.onlyDigitsOf(cpf);
    if (!this.isValidLengthCpf(cpf) || this.hasAllDigitsEqualsInCpf(cpf))
      return false;
  
    const firstCheckDigit = this.findCheckDigit({ cpf, factor: 10 });
    const secondCheckDigit = this.findCheckDigit({ cpf, factor: 11 });
    return this.extractCheckDigitsOf(cpf) === `${firstCheckDigit}${secondCheckDigit}`;
  }

  private onlyDigitsOf(cpf: string) {
    return cpf.replace(/\D/g, '');
  }
  
  private isValidLengthCpf(cpf: string) {
    return cpf.length === 11;
  }
  
  private hasAllDigitsEqualsInCpf(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every(digits => digits === firstDigit);
  }
  
  private findCheckDigit({ cpf, factor }: { cpf: string, factor: number }) {
    let result = 0;
    for (const digit of cpf) {
      if (factor > 1)
        result += parseInt(digit) * factor--;
    }
  
    const rest = result % 11;  
    if (rest === 0 || rest === 1)
      return 0;
  
    return 11 - rest;
  }
  
  private extractCheckDigitsOf(cpf: string) {
    return cpf.slice(9);
  }
}
