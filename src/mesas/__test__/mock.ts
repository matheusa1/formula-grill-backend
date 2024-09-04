import { faker } from '@faker-js/faker';

export const mockCreateMesa = [
  {
    id: 1,
    code: faker.company.name(),
    seats: faker.number.int(),
    status: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    id: 2,
    code: faker.company.name(),
    seats: faker.number.int(),
    status: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    id: 3,
    code: faker.company.name(),
    seats: faker.number.int(),
    status: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];

export const prismaMockMesa = {
  mesas: {
    create: jest.fn().mockReturnValue(mockCreateMesa[0]),
    findMany: jest.fn().mockResolvedValue(mockCreateMesa),
    findUnique: jest.fn().mockResolvedValue(mockCreateMesa[0]),
    update: jest.fn().mockResolvedValue(mockCreateMesa[0]),
    delete: jest.fn(), // O método delete não retorna nada
  },
};
