import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// import { AnyExceptionFilter } from '../common/filters/any-exception.filter';
// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
// import { WrapResponseInterceptor } from '../common/interceptors/wrap-response.interceptor';
// import { SmartValidationPipe } from '../common/pipes/smart-validation.pipe';

function setupApp (app: INestApplication): INestApplication {
  // app.useGlobalPipes(new SmartValidationPipe());
  // app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());
  // app.useGlobalInterceptors(new WrapResponseInterceptor());
  app.useGlobalPipes(
	new ValidationPipe({
		whitelist: true,
    forbidNonWhitelisted:true,
		transform: true,
		transformOptions:{
			// неявное преобразование типов на глобальном уровне
			enableImplicitConversion:true
		}
	}),
  )
  const options = new DocumentBuilder()
	.setTitle('👁️❤️☕')
	.setDescription('App about coffee')
	.setVersion('1.0')
	.build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  return app;
}

export default setupApp;
