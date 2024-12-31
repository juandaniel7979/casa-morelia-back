import { Bebidas } from './bebidas.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BebidasService {
  constructor(
    @InjectRepository(Bebidas)
    private bebidasRepository: Repository<Bebidas>,
  ) {}

  findAll(): Promise<Bebidas[]> {
    return this.bebidasRepository.find();
  }

  findOne(id: number): Promise<Bebidas> {
    return this.bebidasRepository.findOne({ where: { id } });
  }

  create(createBebidasDto: Partial<Bebidas>): Promise<Bebidas> {
    const beverage = this.bebidasRepository.create(createBebidasDto);
    return this.bebidasRepository.save(beverage);
  }

  async update(id: number, updateBebidasDto: Partial<Bebidas>): Promise<Bebidas> {
    await this.bebidasRepository.update(id, updateBebidasDto);
    return this.bebidasRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.bebidasRepository.delete(id);
  }
}
