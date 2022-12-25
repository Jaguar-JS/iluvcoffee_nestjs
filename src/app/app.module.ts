import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedConfigModule } from "../config/shared-config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeOrmConfig } from "../config/typeorm.config";

@Module({
  imports: [

    SharedConfigModule.forRoot(),
    CoffeesModule,
    TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
     inject: [ConfigService],
     useFactory: getTypeOrmConfig
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
