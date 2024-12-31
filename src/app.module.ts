import { Module } from '@nestjs/common';
import { PlatosModule } from './platos/platos.module';
import { InventarioModule } from './inventario/inventario.module';
import { RecetasModule } from './recetas/recetas.module';
import { PersonalModule } from './personal/personal.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BebidasModule } from './bebidas/bebidas.module';
import { AdicionesModule } from './adiciones/adiciones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia esto según tu entorno
      port: 5432,        // Puerto de PostgreSQL
      username: 'casa_morelia_db',
      password: 'QcotM5zeeNbWYdsfds',
      database: 'casa_morelia',
      autoLoadEntities: true, // Carga automáticamente las entidades
      synchronize: true,      // Sincroniza los esquemas con la BD (no usar en producción)
    }),
    PlatosModule,
    InventarioModule,
    PersonalModule,
    RecetasModule,
    PedidosModule,
    BebidasModule,
    AdicionesModule
  ],
})
export class AppModule {}
