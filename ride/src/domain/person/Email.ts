export default class Email {
  value: string;
  constructor (email: string) {
    if (!this.validate(email)) throw new Error('Invalid Email.');
    this.value = email;
  }

  private validate (email: string) {
    return String(email)
      .toLowerCase()
      .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}