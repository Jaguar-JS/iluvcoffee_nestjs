import { Base } from "../../utils/base";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
// import { FlavorEntity } from "./flavor.entity";

@Entity('Coffees')
export class CoffeeEntity extends Base{
  @Column({ default: '' })
  name: string;
  @Column({ nullable: true })
  brand: string;
  @Column()
  price: number;
  //
  // @JoinTable()
  // @ManyToMany(() => FlavorEntity, (flavor) => flavor.coffees, { cascade: true })
  // flavors: FlavorEntity[];
}
