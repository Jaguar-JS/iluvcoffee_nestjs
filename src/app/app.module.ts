import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedConfigModule } from "../config/shared-config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeOrmConfig } from "../config/typeorm.config";

@Module({
  imports: [
    CoffeesModule,
    SharedConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }),
  //   ConfigModule.forRoot({
  //   isGlobal: true, // Позволяет обратиться к env во всем приложении
  //   envFilePath: 'envs/.env.development', // Указываем путь до env файла
  // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
