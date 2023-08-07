import { CreatePassenger } from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import { RequestRide } from "../../src/application/usecase/RequestRide";
import PgaAdapter from "../../src/infra/database/PgAdapter";
import RepositoryFactoryDatabase from "../../src/infra/factory/RepositoryFactoryDatabase";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

test('Deve solicitar uma corrida', async () => {
  // given
  const inputCreatePassenger = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	const connection = new PgaAdapter();
	const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);

  const inputRequestRide = {
    passengerId: outputCreatePassenger.passengerId,
    from: {
      lat: -8.087602480277932,
      long: -34.94039886110192,
    },
    to: {
      lat: -7.998906652322922,
      long: -34.97156026714327,
    },
    date: new Date("2021-03-01T10:00:00")
  }

  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
	const outputRequestRide = await requestRide.execute(inputRequestRide);
  expect(outputRequestRide.rideId).toBeDefined();
  await connection.close();
})

test('Deve obter uma corrida', async () => {
  // given
  const inputCreatePassenger = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	const connection = new PgaAdapter();
	const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);

  const inputRequestRide = {
    passengerId: outputCreatePassenger.passengerId,
    from: {
      lat: -8.087602480277932,
      long: -34.94039886110192,
    },
    to: {
      lat: -7.998906652322922,
      long: -34.97156026714327,
    },
    date: new Date("2021-03-01T10:00:00")
  }

  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
	const outputRequestRide = await requestRide.execute(inputRequestRide);

  const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
  const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
  expect(outputGetRide.rideId).toBeDefined();
  expect(outputGetRide.status).toBe('requested');
  expect(outputGetRide.requestDate).toEqual(new Date("2021-03-01T10:00:00"));

  await connection.close();
})
