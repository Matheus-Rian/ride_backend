import { UUID } from "../../application/usecase/models/uuid";
import CarPlate from "./CarPlate";
import Cpf from "../person/Cpf";
import Email from "../person/Email";
import UUIDGenerator from "../identity/UUIDGenerator";

export default class Driver {
  document: Cpf;
  email: Email;
  carPlate: CarPlate
  constructor (
    readonly driverId: UUID,
    readonly name: string,
    email: string,
    document: string,
    carPlate: string,
  ) {
    this.document = new Cpf(document);
    this.email = new Email(email);
    this.carPlate = new CarPlate(carPlate);
  }

  static create (name: string, email: string, document: string, carPlate: string) {
    const uuid = UUIDGenerator.create();
    return new Driver(uuid, name, email, document, carPlate);
  }
}