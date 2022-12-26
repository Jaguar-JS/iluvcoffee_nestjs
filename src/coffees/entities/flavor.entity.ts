import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { CoffeeEntity } from './coffee.entity'

@Entity('Flavor')
export class FlavorEntity {
  
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  name: string

  @ManyToMany(() => CoffeeEntity, (coffee) => coffee.flavors)
  coffees: CoffeeEntity[]
}
