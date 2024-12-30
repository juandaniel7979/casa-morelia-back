import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column({ nullable: true })
  descripcion?: string;
}
