//Миграция в TypeORM — это аналог файла с SQL-запросами
// для обновления схем базы данных.
import { Injectable, NotFoundException } from "@nestjs/common";
import { CoffeeEntity } from './entities/coffee.entity'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlavorEntity } from "./entities/flavor.entity";
import isPostgresError from "../utils/isPostgresError";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRepository: Repository<CoffeeEntity>,
    @InjectRepository(FlavorEntity)
    private readonly flavorRepository: Repository<FlavorEntity>,
  ) {
  }

// All coffees
  async getCoffees(): Promise<CoffeeEntity[]> {
    return this.coffeeRepository.find(
      {
        order: {
          createdAt: 'ASC'
        },
        relations: ['flavors']
      }
    )
  }

//  by-id
  async findOneCoffee(id: number): Promise<CoffeeEntity> {
    let coffee: CoffeeEntity | null = null;
    try {
      coffee = await this.coffeeRepository.findOne({
      where: {
        id
      },
      relations: ['flavors']
    })
        } catch (error) {
      if (!isPostgresError(error) || error.code !== '22003') {
        throw error;
      }
    }

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found!`)
    return coffee
  }

// add coffee
  async createCoffee(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeEntity> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

// update coffee
  async updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<CoffeeEntity> {
 const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }

    return this.coffeeRepository.save(coffee);
  }

// del coffee
  async deleteCoffee(id: number) {
    const coffee = await this.findOneCoffee(id)
    return this.coffeeRepository.remove(coffee)
  }


  private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {
        name,
      },
    })

    if (existingFlavor) {
      return existingFlavor
    }

    return this.flavorRepository.create({ name })
  }
}