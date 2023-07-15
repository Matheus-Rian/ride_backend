import Driver from "../../src/domain/Driver";

test('Should create a Driver', () => {
  const driver = Driver.create('John Doe', 'john.doe@gmail.com', '625.332.890-51', 'AAA9999');
  expect(driver.driverId).toBeDefined();
  expect(driver.name).toBe('John Doe');
	expect(driver.email.value).toBe('john.doe@gmail.com');
	expect(driver.document.value).toBe('625.332.890-51');
	expect(driver.carPlate.value).toBe('AAA9999');
})

test('Not Should create a Driver with invalid document', () => {
  expect(() => Driver.create('John Doe', 'john.doe@gmail.com', '625.332.890-52', 'AAA9999'))
    .toThrow(new Error('Invalid Cpf.'))
})

test('Not Should create a Driver with invalid email', () => {
  expect(() => Driver.create('John Doe', 'john.doe@gmail', '625.332.890-51', 'AAA9999'))
    .toThrow(new Error('Invalid Email.'))
})

test('Not Should create a Driver with invalid car plate', () => {
  expect(() => Driver.create('John Doe', 'john.doe@gmail.com', '625.332.890-51', 'AAA999'))
    .toThrow(new Error('Invalid car plate.'))
})