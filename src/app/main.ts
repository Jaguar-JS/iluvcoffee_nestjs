import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupApp from './setupApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
	new ValidationPipe({
		whitelist: true,
		transform: true,
	}),
  );

  setupApp(app);
  await app.listen(3000);
}
bootstrap();
