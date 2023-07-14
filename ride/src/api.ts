import express from "express";
import Ride from "./Ride";
import crypto from 'crypto';
import { Pool } from 'pg';
import { isValidCpf } from "./CpfValidator";
import { calculate } from "./RideCalculator";
import { CalculateRide } from "./application/usecase/CalculateRide";

const app = express();
app.use(express.json());

const pool = new Pool({
  host: '0.0.0.0',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'ride',
});

app.post("/calculate_ride", async (req, res) => {
	try {
		const usecase = new CalculateRide();
		const output = await usecase.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.post('/passengers', async (req, res) => {
	const client = await pool.connect();
	try {
		const passengerId = crypto.randomUUID();
		if (!isValidCpf(req.body.document)) throw new Error('Invalid Cpf.')
		const query = 'INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)';
		const values = [passengerId, req.body.name, req.body.email, req.body.document];
	
		await client.query(query, values);
	
		res.json({
			passengerId
		});
	} catch (e: any) {
		res.status(422).send(e.message);
	} finally {
		client.release();	
	}
});

app.get('/passengers/:passengerId', async (req, res) => {
	const client = await pool.connect();
	const { rows } = await client.query(
		"SELECT * FROM cccat12.passenger WHERE passenger_id = $1",
		[req.params.passengerId]
	);

	res.json({
		name: rows[0].name,
		email: rows[0].email,
		document: rows[0].document
	});

	client.release();
});

app.post('/drivers', async (req, res) => {
	const client = await pool.connect();
	try {
		const driverId = crypto.randomUUID();
		if (!isValidCpf(req.body.document)) throw new Error('Invalid Cpf.')
		const query = 'INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)';
		const values = [driverId, req.body.name, req.body.email, req.body.document, req.body.carPlate];
	
		await client.query(query, values);
	
		res.json({
			driverId
		});
	} catch (e: any) {
		res.status(422).send(e.message);
	} finally {
		client.release();	
	}
});

app.get('/drivers/:driverId', async (req, res) => {
	const client = await pool.connect();
	const { rows } = await client.query(
		"SELECT * FROM cccat12.driver WHERE driver_id = $1",
		[req.params.driverId]
	);

	res.json({
		name: rows[0].name,
		email: rows[0].email,
		document: rows[0].document,
		carPlate: rows[0].car_plate
	});

	client.release();
});

app.listen(3000);