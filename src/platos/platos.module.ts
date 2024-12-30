import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosController } from './platos.controller';
import { PlatosService } from './platos.service';
import { Plato } from './platos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  controllers: [PlatosController],
  providers: [PlatosService],
})
export class PlatosModule {}
