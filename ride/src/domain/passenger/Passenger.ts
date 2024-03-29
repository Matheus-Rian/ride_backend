import crypto from 'crypto';
import Cpf from '../person/Cpf';
import Email from '../person/Email';
import UUIDGenerator from '../identity/UUIDGenerator';
import { UUID } from '../../application/usecase/models/uuid';

export default class Passenger {
  document: Cpf;
  email: Email;

  constructor (
    readonly passengerId: UUID,
    readonly name: string,
    email: string,
    document: string,
  ) {
    this.document = new Cpf(document);
    this.email = new Email(email);
  }

  static create (name: string, email: string, document: string) {
    const passengerId = UUIDGenerator.create();
    return new Passenger(passengerId, name, email, document);
  }
}