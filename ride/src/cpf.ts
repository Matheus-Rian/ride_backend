// @ts-nocheck
export function isValidLengthCpf(cpf) {
	const formatterCpf = cpf.replace(/\D/g, '');
	return formatterCpf.length === 11 || formatterCpf.length === 14;
}

export function hasNumbersEqualsInCpf(cpf) {
	const formatterCpf = cpf.replace(/\D/g, '');
	return formatterCpf.split("").every(number => number === formatterCpf[0]);
}

export function calculateCheckDigit({ cpf, startCount }) {
	let result = 0;
	for (let nCount = 0; nCount < cpf.length - 2; nCount++) {  
		const digit = parseInt(cpf[nCount]);
		result += (startCount - nCount) * digit;  
	};
	return result;
}

export function findCheckDigit(value) {
	const rest = (value % 11);  
	if (rest === 0 || rest === 1)
		return 0;

	return 11 - rest;
}

export function getCheckDigitsOf(cpf) {
	return cpf.substring(cpf.length - 2, cpf.length);
}

export function isValidCpf(cpf) {
  if (!cpf || !isValidLengthCpf(cpf) || hasNumbersEqualsInCpf(cpf))
    return false;

	cpf = cpf.replace(/\D/g, '');
	try {
		const d1 = calculateCheckDigit({ cpf, startCount: 10 });
		const firstCheckDigit = findCheckDigit(d1);

		const d2 = calculateCheckDigit({ cpf, startCount: 11 });
		const secondCheckDigit = findCheckDigit(d2 + 2 * firstCheckDigit);

		const checkDigitsFound = `${firstCheckDigit}${secondCheckDigit}`; 
		return getCheckDigitsOf(cpf) === checkDigitsFound;
	} catch (e) {  
		console.error("Erro inesperado! Tente novamente mais tarde." + e);  
		return false;  
	}  
}