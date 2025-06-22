import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sku!: string;

  @Column()
  name!: string;

  @Column({ type: "decimal" })
  price!: number;

  @Column("text", { array: true, default: [] })
  images!: string[];
}
