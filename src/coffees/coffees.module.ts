import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeeEntity } from "./entities/coffee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlavorEntity } from "./entities/flavor.entity";

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
  imports: [TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity])]
})
export class CoffeesModule {}
