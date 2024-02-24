import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { PORT } from './constant';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Vehicle Management System')
    .setDescription('Vechile Management System APIs')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // helmet security
  app.use(helmet());

  process.on('SIGTERM', () => {
    app.close();
    const dataSource: DataSource = app.get(DataSource);
    dataSource.destroy();
    process.exit(0);
  });
  await app.listen(PORT);
}
bootstrap();
