import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuscarNotaPorIdService } from 'src/nota/aplicacion/BuscarNotaPorIdService';
import { BuscarNotasService } from 'src/nota/aplicacion/BuscarNotasService';
import { CrearNotaService } from 'src/nota/aplicacion/CrearNotaService';
import { EliminarNotaService } from 'src/nota/aplicacion/EliminarNotaService';
import { ModificarNotaService } from 'src/nota/aplicacion/ModificarNotaService';
import { NotaEntity } from 'src/nota/infraestructura/Entity/NotaEntity';
import { NotaController } from 'src/nota/infraestructura/NotaController/NotaController';
import { NotaRepositorioAdaptador } from 'src/nota/infraestructura/Repositorio/NotaRepositorioAdaptador';

@Module({
  imports: [TypeOrmModule.forFeature([NotaEntity])],
  providers: [CrearNotaService,ModificarNotaService,EliminarNotaService,BuscarNotasService,BuscarNotaPorIdService,
  {
    provide: 'NotaRepositorio',
    useClass: NotaRepositorioAdaptador
  }],
  controllers: [NotaController]
})
export class NotaModule {}