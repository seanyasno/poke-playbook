import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const createTestApp = async (
  moduleRef: TestingModule,
): Promise<INestApplication> => {
  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
};

export const makeAuthenticatedRequest = (
  app: INestApplication,
  token: string,
) => {
  return request(app.getHttpServer()).set('Authorization', `Bearer ${token}`);
};

export const makeRequest = (app: INestApplication) => {
  return request(app.getHttpServer());
};
