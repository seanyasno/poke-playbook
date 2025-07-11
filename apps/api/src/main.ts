import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setTitle('Poke Playbook api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3100);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
