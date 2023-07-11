export function onlyDigitsOf(cpf: string) {
	return cpf.replace(/\D/g, '');
}

export function isValidLengthCpf(cpf: string) {
	return cpf.length === 11;
}

export function hasAllDigitsEqualsInCpf(cpf: string) {
	const [firstDigit] = cpf;
	return [...cpf].every(digits => digits === firstDigit);
}

export function findCheckDigit({ cpf, factor }: { cpf: string, factor: number }) {
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

export function extractCheckDigitsOf(cpf: string) {
	return cpf.slice(9);
}

export function isValidCpf(cpf: string) {
	cpf = onlyDigitsOf(cpf);
  if (!isValidLengthCpf(cpf) || hasAllDigitsEqualsInCpf(cpf))
    return false;

	const firstCheckDigit = findCheckDigit({ cpf, factor: 10 });
	const secondCheckDigit = findCheckDigit({ cpf, factor: 11 });
	return extractCheckDigitsOf(cpf) === `${firstCheckDigit}${secondCheckDigit}`;
}