export default class CarPlate {
  value: string;
  constructor (carPlate: string) {
    if (!this.validate(carPlate)) throw new Error('Invalid car plate.');
    this.value = carPlate;
  }

  private validate (carPlate: string) {
    return String(carPlate)
      .toLowerCase()
      .match(
        /^[a-z]{3}[0-9]{4}$/
      );
  }
}