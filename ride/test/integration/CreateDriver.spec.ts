import { CreateDriver } from "../../src/application/usecase/CreateDriver";
import { GetDriver } from "../../src/application/usecase/GetDriver";

test("Should signup Driver", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA999'
	};
	// when
  const usecase = new CreateDriver();
  const output = await usecase.execute(input);
	// then
	expect(output.driverId).toBeDefined();
});

test('Should get Driver', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA999'
	};
	// when
  const usecase1 = new CreateDriver();
  const output1 = await usecase1.execute(input);
	const usecase2 = new GetDriver();
  const output2 = await usecase2.execute(output1);
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
	expect(output2.carPlate).toBe('AAA999');
});