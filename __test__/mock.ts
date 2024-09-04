import { faker } from '@faker-js/faker';

export const newUserMock = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: '123123',
};
