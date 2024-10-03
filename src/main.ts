import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: +process.env.PORT
  }})
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(`Server running on http://localhost:${process.env.PORT}`, 'Bootstrap');
}
bootstrap();
