import AcceptRide from "../../src/application/usecase/AcceptRide";
import { CreateDriver } from "../../src/application/usecase/CreateDriver";
import { CreatePassenger } from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import { RequestRide } from "../../src/application/usecase/RequestRide";
import StartRide from "../../src/application/usecase/StartRide";
import PgaAdapter from "../../src/infra/database/PgAdapter";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

test('Deve iniciar uma corrida', async () => {
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

  const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA9999'
	};
	// when
  const createDriver = new CreateDriver(new DriverRepositoryDatabase(connection));
  const outputCreateDriver = await createDriver.execute(input);

  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: outputCreateDriver.driverId,
    date: new Date("2021-03-01T10:10:00")
  }

  const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
  await acceptRide.execute(inputAcceptRide);

  const inputStartRide = {
    rideId: outputRequestRide.rideId,
    date: new Date("2021-03-01T10:20:00")
  }
  const startRide = new StartRide(new RideRepositoryDatabase(connection));
  await startRide.execute(inputStartRide);

  const getRide = new GetRide(new RideRepositoryDatabase(connection));
  const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
  expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
  expect(outputGetRide.status).toBe('in_progress');
  expect(outputGetRide.startDate).toEqual(new Date("2021-03-01T10:20:00"));

  await connection.close();
})
