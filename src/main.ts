import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_SERVICE } from './courses/constants';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_SERVER,
      queue: QUEUE_SERVICE
    }
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'courses',
      protoPath: join(__dirname, './courses/proto/courses.proto'),
      url: process.env.GRPC_SERVER
    }
  });

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'courses',
  //     protoPath: join(__dirname, './courses/proto/courses.proto'),
  //     url: process.env.GRPC_SERVER
  //   }
  // })

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3010);
  Logger.log(`Server running on ${3010}`, 'Bootstrap');
}
bootstrap();
