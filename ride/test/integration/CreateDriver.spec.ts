import { CreateDriver } from "../../src/application/usecase/CreateDriver";

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