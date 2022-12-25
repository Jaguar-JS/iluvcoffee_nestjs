//Миграция в TypeORM — это аналог файла с SQL-запросами
// для обновления схем базы данных.
import { Injectable, NotFoundException } from "@nestjs/common";
import { CoffeeEntity } from './entities/coffee.entity'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRepository: Repository<CoffeeEntity>,
  ) {}
  private readonly coffees: CoffeeEntity[]=
    [
      {
        id: 1,
        createdAt: new  Date("2022-12-25T15:40:21.824Z"),
        updatedAt: new  Date("2022-12-25T16:07:38.956Z"),
        name: "Espresso",
        brand: "Short, strong coffee",
        price: 5
      },
      {
        id: 2,
        createdAt: new  Date("2022-12-25T16:03:33.320Z"),
        updatedAt: new  Date("2022-12-25T16:24:50.909Z"),
        name: "Shipwreck Roast",
        brand: "Buddy Brew",
        price: 10
      },
      {
        id: 3,
        createdAt: new  Date("2022-12-25T16:04:20.995Z"),
        updatedAt: new  Date("2022-12-25T16:04:20.995Z"),
        name: "Raw coconut Latte",
        brand: "Lucky Coffee",
        price: 7
      },
      {
        id: 4,
        createdAt: new  Date("2022-12-25T16:24:15.735Z"),
        updatedAt: new  Date("2022-12-25T16:24:15.735Z"),
        name: "Espresso",
        brand: "Lucky Coffee",
        price: 5
      }
    ]

// All coffees
  async getCoffees(): Promise<CoffeeEntity[]> {
    return this.coffeeRepository.find(
      {
        order: {
          createdAt: 'ASC'
        }
      }
    )
  }

//  by-id
  async getCoffee(id: number): Promise<CoffeeEntity> {
    const coffee= await this.coffeeRepository.findOne({
      where: {
        id
      },
    })
    if (!coffee) throw new NotFoundException('Coffee not found!')
    return coffee
  }

// add coffee
  async createCoffee(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeEntity[]> {
    // const coffee =await this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(this.coffees);
  }

// update coffee
  async updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<CoffeeEntity> {
    const coffee= await this.getCoffee(id)
    return this.coffeeRepository.save({
      ...coffee,
      ...updateCoffeeDto
    })
  }

// del coffee
  async deleteCoffee(id: number) {
    const coffee= await this.getCoffee(id)
    return this.coffeeRepository.remove(coffee)
  }
}
