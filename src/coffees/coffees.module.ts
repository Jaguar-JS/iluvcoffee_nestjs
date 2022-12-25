import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeeEntity } from "./entities/coffee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
  imports: [TypeOrmModule.forFeature([CoffeeEntity])]
})
export class CoffeesModule {}
