import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  cantidad: number;

  @Column('decimal')
  precio: number;
}
