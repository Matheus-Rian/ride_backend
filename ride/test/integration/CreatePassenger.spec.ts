import { CreatePassenger } from "../../src/application/usecase/CreatePassenger";
import { GetPassenger } from "../../src/application/usecase/GetPassenger";

test("Should signup Passenger", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	// when
	const usecase = new CreatePassenger();
	const output = await usecase.execute(input);
	// then
	expect(output.passengerId).toBeDefined();
});

test('Should get Passanger', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	// when
  const usecase1 = new CreatePassenger();
	const output1 = await usecase1.execute(input);
  const usecase2 = new GetPassenger();
	const output2 = await usecase2.execute({ passengerId: output1.passengerId });
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
});