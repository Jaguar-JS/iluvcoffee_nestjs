import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedConfigModule } from "../config/shared-config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeOrmConfig } from "../config/typeorm.config";
import { CoffeeEntity } from "../coffees/entities/coffee.entity";

@Module({
  imports: [

    SharedConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      // entities: [CoffeeEntity]
    }),
    CoffeesModule,
    //TypeOrmModule.forRootAsync({
    //  imports: [ConfigModule],
     // inject: [ConfigService],
    //  useFactory: getTypeOrmConfig
    //}),
  //   ConfigModule.forRoot({
  //   isGlobal: true, // Позволяет обратиться к env во всем приложении
  //   envFilePath: 'envs/.env.development', // Указываем путь до env файла
  // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
