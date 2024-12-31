/* eslint-disable */
import {
  ConflictException,
  Injectable,
  NotFoundException } from '@nestjs/common';
import { Adiciones } from './adiciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AdicionesService {
  constructor(
    @InjectRepository(Adiciones)
    private adicionesRepository: Repository<Adiciones>,
  ) {}

  // Obtener todos los productos
  async findAll(): Promise<Adiciones[]> {
    return this.adicionesRepository.find();
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Adiciones> {
    const producto = await this.adicionesRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // Actualizar un producto existente
  async update(id: number, adicion: { nombre: string; cantidad: number; precio: number }): Promise<Adiciones> {
    const producto = await this.findOne(id); // Lanza una excepción si no se encuentra
    const updatedProducto = Object.assign(producto, adicion);
    return this.adicionesRepository.save(updatedProducto);
  }

  // Crear un producto individual
  async create(adicion: { nombre: string; precio: number }): Promise<Adiciones> {
    try {
      const existingAdicion = await this.adicionesRepository.findOneBy({ nombre: adicion.nombre }); // Cambia según tu campo único);
      console.log('existingAdicion', existingAdicion);
      if (existingAdicion) {
        throw new ConflictException(`El adicion ya está registrado ${existingAdicion}`);
      }
      const newItem = this.adicionesRepository.create(adicion);
      return this.adicionesRepository.save(newItem);
    } catch (error) {
      throw new ConflictException('No se puede guardar el adicion', error);
    }
  }


  
  // Crear productos masivamente
  async createBulk(adicions: Array<{ nombre: string; cantidad: number; precio: number }>): Promise<Adiciones[]> {
     // Validar duplicados en paralelo
    const validations = adicions.map(async (adicion) => {
      const exists = await this.adicionesRepository.findOneBy( { nombre: adicion.nombre });
      if (exists) {
        throw new ConflictException(`El adicion "${adicion}" ya existe.`);
      }
      return adicion;
    });
    try {
      await Promise.all(validations);
    } catch (error) {
      throw new ConflictException('No se puede guardar. Algunos elementos ya existen.', error);
    }
    const savedItems = await Promise.all(
      adicions.map((adicion) => this.adicionesRepository.save(adicion)),
    );

    return savedItems;
  }


}