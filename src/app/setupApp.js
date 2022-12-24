"use strict";
exports.__esModule = true;
var swagger_1 = require("@nestjs/swagger");
// import { AnyExceptionFilter } from '../common/filters/any-exception.filter';
// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
// import { WrapResponseInterceptor } from '../common/interceptors/wrap-response.interceptor';
// import { SmartValidationPipe } from '../common/pipes/smart-validation.pipe';
function setupApp(app) {
    // app.useGlobalPipes(new SmartValidationPipe());
    // app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());
    // app.useGlobalInterceptors(new WrapResponseInterceptor());
    var options = new swagger_1.DocumentBuilder()
        .setTitle('👁️❤️☕')
        .setDescription('App about coffee')
        .setVersion('1.0')
        .build();
    var document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    return app;
}
exports["default"] = setupApp;
