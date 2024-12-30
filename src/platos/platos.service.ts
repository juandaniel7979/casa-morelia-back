import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './platos.entity';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Plato)
    private platosRepository: Repository<Plato>,
  ) {}

  findAll(): Promise<Plato[]> {
    return this.platosRepository.find();
  }

  findOne(id: number): Promise<Plato> {
    return this.platosRepository.findOneBy({ id });
  }

  create(plato: Partial<Plato>): Promise<Plato> {
    const newPlato = this.platosRepository.create(plato);
    return this.platosRepository.save(newPlato);
  }

  async remove(id: number): Promise<void> {
    await this.platosRepository.delete(id);
  }
}
