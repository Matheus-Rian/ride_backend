import Passenger from "../../src/domain/passenger/Passenger";

test('Should create a Passenger', () => {
  const passenger = Passenger.create('John Doe', 'john.doe@gmail.com', '625.332.890-51');
  expect(passenger.passengerId).toBeDefined();
  expect(passenger.name).toBe('John Doe');
	expect(passenger.email.value).toBe('john.doe@gmail.com');
	expect(passenger.document.value).toBe('625.332.890-51');
})

test('Not Should create a Passenger with invalid document', () => {
  expect(() => Passenger.create('John Doe', 'john.doe@gmail.com', '625.332.890-52'))
    .toThrow(new Error('Invalid Cpf.'))
})

test('Not Should create a Passenger with invalid email', () => {
  expect(() => Passenger.create('John Doe', 'john.doe@gmail', '625.332.890-51'))
    .toThrow(new Error('Invalid Email.'))
})