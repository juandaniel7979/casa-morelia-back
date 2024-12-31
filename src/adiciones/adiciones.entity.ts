import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Adiciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column('decimal')
  precio: number;
}
