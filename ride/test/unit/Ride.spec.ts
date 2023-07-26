
import Ride from "../../src/domain/Ride";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
	const ride = new Ride();
	ride.addPosition(-8.087602480277932, -34.94039886110192, new Date("2021-03-01T10:00:00"));
	ride.addPosition(-7.998906652322922, -34.97156026714327, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(21);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
	const ride = new Ride();
	ride.addPosition(-8.087602480277932, -34.94039886110192, new Date("2021-03-01T23:00:00"));
	ride.addPosition(-7.998906652322922, -34.97156026714327, new Date("2021-03-01T23:00:00"));
	expect(ride.calculate()).toBe(39);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
	const ride = new Ride();
	ride.addPosition(-8.087602480277932, -34.94039886110192, new Date("2021-03-07T10:00:00"));
	ride.addPosition(-7.998906652322922, -34.97156026714327, new Date("2021-03-07T10:00:00"));
	expect(ride.calculate()).toBe(29);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
	const ride = new Ride();
	ride.addPosition(-8.087602480277932, -34.94039886110192, new Date("2021-03-07T23:00:00"));
	ride.addPosition(-7.998906652322922, -34.97156026714327, new Date("2021-03-07T23:00:00"));	
	expect(ride.calculate()).toBe(50);
});

test("Deve lançar um erro se a data for inválida", function () {
	const ride = new Ride();
	ride.addPosition(-8.087602480277932, -34.94039886110192, new Date("JavaScript"));
	ride.addPosition(-7.998906652322922, -34.97156026714327, new Date("JavaScript"));
	expect(() => ride.calculate()).toThrow(new Error("Invalid date"));
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
	const ride = new Ride();
	ride.addPosition(-8.087602480277932, -34.94039886110192, new Date("2021-03-07T10:00:00"));
	ride.addPosition(-8.078526196150117, -34.93453928495122, new Date("2021-03-07T10:00:00"));	
	expect(ride.calculate()).toBe(10);
});
