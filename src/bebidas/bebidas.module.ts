import { Module } from '@nestjs/common';
import { BebidasController } from './bebidas.controller';
import { BebidasService } from './bebidas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bebidas } from './bebidas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bebidas])],
  controllers: [BebidasController],
  providers: [BebidasService]
})
export class BebidasModule {}
