import { CreatePassenger } from "../../src/application/usecase/CreatePassenger";
import { GetPassenger } from "../../src/application/usecase/GetPassenger";
import PgaAdapter from "../../src/infra/database/PgAdapter";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

test("Should signup Passenger", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	// when
	const connection = new PgaAdapter();
	const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	const output = await usecase.execute(input);
	// then
	expect(output.passengerId).toBeDefined();
	await connection.close();
});

test("Should throw Error when email Passenger is invalid", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail',
		document: '625.332.890-51'
	};
	// when
	const connection = new PgaAdapter();
	const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	// then
	await expect(() => usecase.execute(input)).rejects.toThrow(new Error('Invalid Email.'));
	await connection.close();
});

test('Should get Passanger', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	// when
	const connection = new PgaAdapter();
  const usecase1 = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	const output1 = await usecase1.execute(input);
  const usecase2 = new GetPassenger(new PassengerRepositoryDatabase(connection));
	const output2 = await usecase2.execute({ passengerId: output1.passengerId });
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
	await connection.close();
});