import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bebidas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column('decimal')
  precio: number;
}
