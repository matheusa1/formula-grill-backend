import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { newUserMock } from './mock';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create User and Login', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(newUserMock);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', newUserMock.name);
    expect(response.body).toHaveProperty('email', newUserMock.email);
    expect(response.body).toHaveProperty('password');

    const passwordValidation = await bcrypt.compare(
      newUserMock.password,
      response.body.password,
    );

    expect(passwordValidation).toBe(true);

    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('role', 'USER');

    const loginResponse = await request(app.getHttpServer())
      .post('/login')
      .send({ email: newUserMock.email, password: newUserMock.password });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('access_token');

    const me = await request(app.getHttpServer())
      .get('/user/me')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`);

    expect(me.status).toBe(200);
    expect(me.body).toHaveProperty('name', newUserMock.name);
    expect(me.body).toHaveProperty('email', newUserMock.email);
    expect(me.body).toHaveProperty('role', 'USER');
  });
});
