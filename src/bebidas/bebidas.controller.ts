import { Controller, Get, Post, Body } from '@nestjs/common';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { Bebidas } from './bebidas.entity';
import { BebidasService } from './bebidas.service';

@Controller('bebidas')
export class BebidasController {
    constructor(private readonly bebidasService:BebidasService) {}

  // Obtener todos los productos
  @Get()
  async findAll(): Promise<Bebidas[]> {
    return this.bebidasService.findAll();
  }
  
  @Post()
  async create(
    @Body(new JoiValidationPipe(createAdicion)) item: { nombre: string; precio: number },
  ): Promise<Bebidas> {
    return this.bebidasService.create(item);
  }
  
}