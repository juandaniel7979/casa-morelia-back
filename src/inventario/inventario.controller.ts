import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { CreateInventarioSchema, BulkInventarioSchema } from '../schemas/create-inventario.schema';
import { Inventario } from './inventario.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  // Obtener todos los productos
  @Get()
  async findAll(): Promise<Inventario[]> {
    return this.inventarioService.findAll();
  }

  // Obtener un producto por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Inventario> {
    return this.inventarioService.findOne(id);
  }


  // Actualizar un producto existente
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(CreateInventarioSchema)) item: { nombre: string; cantidad: number; precio: number },
  ): Promise<Inventario> {
    return this.inventarioService.update(id, item);
  }

  // Crear un producto individual
  @Post()
  async create(
    @Body(new JoiValidationPipe(CreateInventarioSchema)) item: { nombre: string; cantidad: number; precio: number },
  ): Promise<Inventario> {
    return this.inventarioService.create(item);
  }

  // Cargar productos masivamente
  @Post('bulk')
  async createBulk(
    @Body(new JoiValidationPipe(BulkInventarioSchema)) items: Array<{ nombre: string; cantidad: number; precio: number }>,
  ): Promise<Inventario[]> {
    return this.inventarioService.createBulk(items);
  }
}
