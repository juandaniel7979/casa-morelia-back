/* eslint-disable */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { AdicionesService } from './adiciones.service';
import { Adiciones } from './adiciones.entity';
import { createAdicion } from 'src/schemas/adiciones.schema';

@Controller('adiciones')
export class AdicionesController {
  constructor(private readonly adicionesService:AdicionesService) {}

  // Obtener todos los productos
  @Get()
  async findAll(): Promise<Adiciones[]> {
    return this.adicionesService.findAll();
  }
  
  @Post()
  async create(
    @Body(new JoiValidationPipe(createAdicion)) item: { nombre: string; precio: number },
  ): Promise<Adiciones> {
    return this.adicionesService.create(item);
  }
  
}

