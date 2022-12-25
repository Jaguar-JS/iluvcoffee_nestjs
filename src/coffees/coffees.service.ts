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
    private readonly coffeeRepository: Repository<CoffeeEntity>
  ) {}

// All coffees
  async getCoffees(): Promise<CoffeeEntity[]> {
    return this.coffeeRepository.find()
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
  async createCoffee(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeEntity> {
    const coffee =await this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
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
