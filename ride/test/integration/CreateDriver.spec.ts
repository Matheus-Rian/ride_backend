import { DriverRepository } from "../../src/application/repository/DriverRepository";
import { CreateDriver } from "../../src/application/usecase/CreateDriver";
import { GetDriver } from "../../src/application/usecase/GetDriver";
import { UUID } from "../../src/application/usecase/models/uuid";
import Driver from "../../src/domain/driver/Driver";
import PgaAdapter from "../../src/infra/database/PgAdapter";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";

// broad integration test
test("Should signup Driver", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA9999'
	};
	// when
	const connection = new PgaAdapter();
  const usecase = new CreateDriver(new DriverRepositoryDatabase(connection));
  const output = await usecase.execute(input);
	// then
	expect(output.driverId).toBeDefined();
	await connection.close();
});

// narrow integration test
test('Should get Driver', async () => {
	const driverRepository: DriverRepository = {
		async save (driver: Driver): Promise<void> {
		},
		async get (driverId: UUID): Promise<Driver> {
			return new Driver(
				'' as UUID,
				'John Doe',
				'john.doe@gmail.com',
				'625.332.890-51',
				'AAA9999'
			);
		}
	}

	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA9999'
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
	expect(output2.carPlate).toBe('AAA9999');
});

// broad integration test
test('Should get Driver', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA9999'
	};
	// when
	const connection = new PgaAdapter();
  const usecase1 = new CreateDriver(new DriverRepositoryDatabase(connection));
  const output1 = await usecase1.execute(input);
	const usecase2 = new GetDriver(new DriverRepositoryDatabase(connection));
  const output2 = await usecase2.execute(output1);
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
	expect(output2.carPlate).toBe('AAA9999');
	await connection.close();
});