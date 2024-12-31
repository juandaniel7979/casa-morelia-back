import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './inventario.entity';
import { CreateInventarioSchema } from 'src/schemas/create-inventario.schema';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepository: Repository<Inventario>,
  ) {}

  // Obtener todos los productos
  async findAll(): Promise<Inventario[]> {
    return this.inventarioRepository.find();
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Inventario> {
    const producto = await this.inventarioRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // Actualizar un producto existente
  async update(id: number, item: { nombre: string; cantidad: number; precio: number }): Promise<Inventario> {
    const producto = await this.findOne(id); // Lanza una excepción si no se encuentra
    const updatedProducto = Object.assign(producto, item);
    return this.inventarioRepository.save(updatedProducto);
  }

  // Crear un producto individual
  async create(item: { nombre: string; cantidad: number; precio: number }): Promise<Inventario> {
    try {
      const existingItem = await this.inventarioRepository.findOneBy({ nombre: item.nombre }); // Cambia según tu campo único);
      console.log('existingItem', existingItem);
      if (existingItem) {
        throw new ConflictException(`El item ya está registrado ${existingItem}`);
      }
      const newItem = this.inventarioRepository.create(item);
      return this.inventarioRepository.save(newItem);
    } catch (error) {
      throw new ConflictException('No se puede guardar el item', error);
    }
  }


  
  // Crear productos masivamente
  async createBulk(items: Array<{ nombre: string; cantidad: number; precio: number }>): Promise<Inventario[]> {
     // Validar duplicados en paralelo
    const validations = items.map(async (item) => {
      const exists = await this.inventarioRepository.findOneBy( { nombre: item.nombre });
      if (exists) {
        throw new ConflictException(`El item "${item}" ya existe.`);
      }
      return item;
    });
    try {
      await Promise.all(validations);
    } catch (error) {
      throw new ConflictException('No se puede guardar. Algunos elementos ya existen.', error);
    }
    const savedItems = await Promise.all(
      items.map((item) => this.inventarioRepository.save(item)),
    );

    return savedItems;
  }


}