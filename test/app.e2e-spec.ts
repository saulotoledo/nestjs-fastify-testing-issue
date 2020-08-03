import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as fastifyHelmet from 'fastify-helmet';
import { AppModule } from './../src/app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    // @ts-ignore
    app.register(fastifyHelmet, {
      dnsPrefetchControl: true,
      frameguard: true,
      hidePoweredBy: true,
      ieNoOpen: true,
      noCache: true,
      noSniff: true,
      permittedCrossDomainPolicies: true,
      referrerPolicy: true,
      xssFilter: true,
    });

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
