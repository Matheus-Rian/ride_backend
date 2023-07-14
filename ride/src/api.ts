import express from "express";

import { Pool } from 'pg';

import { CalculateRide } from "./application/usecase/CalculateRide";
import { CreatePassenger } from "./application/usecase/CreatePassenger";
import { CreateDriver } from "./application/usecase/CreateDriver";
import { GetPassenger } from "./application/usecase/GetPassenger";
import { UUID } from "./application/usecase/models/uuid";

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
	try {
		const usecase = new CreatePassenger();
		const output = await usecase.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
	} 
});

app.get('/passengers/:passengerId', async (req, res) => {
	const usecase = new GetPassenger();
	const output = await usecase.execute({ passengerId: req.params.passengerId as UUID });
	res.json(output);
});

app.post('/drivers', async (req, res) => {
	try {
		const usecase = new CreateDriver();
		const output = await usecase.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
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