import { DriverRepository } from "../../src/application/repository/DriverRepository";
import { CreateDriver } from "../../src/application/usecase/CreateDriver";
import { GetDriver } from "../../src/application/usecase/GetDriver";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";

// broad integration test
test("Should signup Driver", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA999'
	};
	// when
  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute(input);
	// then
	expect(output.driverId).toBeDefined();
});

// narrow integration test
test('Should get Driver', async () => {
	const driverRepository: DriverRepository = {
		async save (driver: any): Promise<void> {
		},
		async get (driverId: any): Promise<any> {
			return [{
				driver_id: '',
				name: 'John Doe',
				email: 'john.doe@gmail.com',
				document: '625.332.890-51',
				car_plate: 'AAA999'
			}]
		}
	}

	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA999'
	};
	// when
  const usecase1 = new CreateDriver(driverRepository);
  const output1 = await usecase1.execute(input);
	const usecase2 = new GetDriver(driverRepository);
  const output2 = await usecase2.execute(output1);
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
	expect(output2.carPlate).toBe('AAA999');
});

// broad integration test
test('Should get Driver', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA999'
	};
	// when
  const usecase1 = new CreateDriver(new DriverRepositoryDatabase());
  const output1 = await usecase1.execute(input);
	const usecase2 = new GetDriver(new DriverRepositoryDatabase());
  const output2 = await usecase2.execute(output1);
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
	expect(output2.carPlate).toBe('AAA999');
});