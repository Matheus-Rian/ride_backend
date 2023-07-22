import express from "express";
import { CalculateRide } from "./application/usecase/CalculateRide";
import { CreatePassenger } from "./application/usecase/CreatePassenger";
import { CreateDriver } from "./application/usecase/CreateDriver";
import { GetPassenger } from "./application/usecase/GetPassenger";
import { GetDriver } from "./application/usecase/GetDriver";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import PgaAdapter from "./infra/database/PgAdapter";
import MainController from "./infra/http/MainController";
import ExpressAdapter from "./infra/http/ExpressAdapter";

// Main composition root
const connection = new PgaAdapter();
const passangerRepository = new PassengerRepositoryDatabase(connection);
const driverRepository = new DriverRepositoryDatabase(connection);

const calculateRide = new CalculateRide();
const createPassenger = new CreatePassenger(passangerRepository);
const getPassenger = new GetPassenger(passangerRepository);
const createDriver = new CreateDriver(driverRepository);
const getDriver = new GetDriver(driverRepository);
const httpServer = new ExpressAdapter();

new MainController(
	httpServer,
	calculateRide,
	createPassenger,
	getPassenger,
	createDriver,
	getDriver
);
httpServer.listen(3000);
