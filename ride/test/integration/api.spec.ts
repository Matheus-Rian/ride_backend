import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	// given
  const input = {
    positions: [
      { lat: -8.087602480277932, long: -34.94039886110192, date: new Date("2021-03-01T10:00:00") },
      { lat: -7.998906652322922, long: -34.97156026714327, date: new Date("2021-03-01T10:00:00") },
    ]
  };
	// when
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	const output = response.data;
	// then
	expect(output.price).toBe(21);
});

test("Se a data for inválida deve lançar um erro", async function () {
	// given
  const input = {
    positions: [
      { lat: -8.087602480277932, long: -34.94039886110192, date: "JavaScript" },
      { lat: -7.998906652322922, long: -34.97156026714327, date: "JavaScript" },
    ]
  };
	// when
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	const output = response.data;
	// then
	expect(response.status).toBe(422);
	expect(output).toBe("Invalid date");
});

test("Should signup Passenger", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	// when
	const response = await axios.post("http://localhost:3000/passengers", input);
	const output = response.data;
	// then
	expect(output.passengerId).toBeDefined();
});

test("Not should signup Passenger with document invalid", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-52'
	};
	// when
	const response = await axios.post("http://localhost:3000/passengers", input);
	const output = response.data;
	// then
	expect(response.status).toBe(422);
	expect(output).toBe("Invalid Cpf.");
});

test('Should get Passanger', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51'
	};
	// when
	const response1 = await axios.post("http://localhost:3000/passengers", input);
	const output1 = response1.data;
	const response2 = await axios.get(`http://localhost:3000/passengers/${output1.passengerId}`);
	const output2 = response2.data;
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
});

test("Should signup Driver", async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA9999'
	};
	// when
	const response = await axios.post("http://localhost:3000/drivers", input);
	const output = response.data;
	// then
	expect(output.driverId).toBeDefined();
});

test('Should get Driver', async () => {
	// given
	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		document: '625.332.890-51',
		carPlate: 'AAA9999'
	};
	// when
	const response1 = await axios.post("http://localhost:3000/drivers", input);
	const output1 = response1.data;
	const response2 = await axios.get(`http://localhost:3000/drivers/${output1.driverId}`);
	const output2 = response2.data;
	// then
	expect(output2.name).toBe('John Doe');
	expect(output2.email).toBe('john.doe@gmail.com');
	expect(output2.document).toBe('625.332.890-51');
	expect(output2.carPlate).toBe('AAA9999');
});