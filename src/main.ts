import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_SERVICE } from './courses/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_SERVER],
      queue: QUEUE_SERVICE,
      queueOptions: {
        durable: true
      }
  }})
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(`Server running on ${process.env.RMQ_SERVER}`, 'Bootstrap');
}
bootstrap();
