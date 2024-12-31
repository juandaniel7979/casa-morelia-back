import { Module } from '@nestjs/common';
import { AdicionesController } from './adiciones.controller';
import { AdicionesService } from './adiciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adiciones } from './adiciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adiciones])],
  controllers: [AdicionesController],
  providers: [AdicionesService]
})
export class AdicionesModule {}
