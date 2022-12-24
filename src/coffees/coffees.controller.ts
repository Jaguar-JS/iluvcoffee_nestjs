import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from "@nestjs/common";
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}



  @Get()
  findAll() {
	return this.coffeesService.getCoffees();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
     const coffee = this.coffeesService.getCoffee(+id);
    if (!coffee) {
      throw new NotFoundException('Coffee Not found');
    }
	return this.coffeesService.getCoffee(+id);
  }

  @Post()
  @HttpCode(200)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
	return this.coffeesService.createCoffee(createCoffeeDto);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
	return this.coffeesService.updateCoffee(+id, updateCoffeeDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
	return this.coffeesService.deleteCoffee(+id);
  }
}
