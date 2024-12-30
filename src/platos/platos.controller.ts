import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { Plato } from './platos.entity';

@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Get()
  findAll(): Promise<Plato[]> {
    return this.platosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Plato> {
    return this.platosService.findOne(id);
  }

  @Post()
  create(@Body() plato: Partial<Plato>): Promise<Plato> {
    return this.platosService.create(plato);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.platosService.remove(id);
  }
}
