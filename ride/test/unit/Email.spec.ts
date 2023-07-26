import Email from "../../src/domain/person/Email";

test('Should return TRUE when email valid', () => {
  // given and when
  const output = new Email('john.doe@gmail.com');
  // then
  expect(output.value).toBeDefined();
})

test('Should return FALSE when email invalid', () => {
  expect(() => new Email('john.doe@gmail')).toThrow(new Error('Invalid Email.'))
})