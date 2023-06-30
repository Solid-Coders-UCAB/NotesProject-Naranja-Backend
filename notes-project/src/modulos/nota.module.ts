import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarpetaEntity } from 'src/carpeta/infraestructura/Entity/CarpetaEntity';
import { BuscarNotaPorIdService } from 'src/nota/aplicacion/BuscarNotaPorIdService';
import { BuscarNotasCarpetaService } from 'src/nota/aplicacion/BuscarNotasCarpetaService';
import { BuscarNotasService } from 'src/nota/aplicacion/BuscarNotasService';
import { CrearNotaService } from 'src/nota/aplicacion/CrearNotaService';
import { EliminarNotaService } from 'src/nota/aplicacion/EliminarNotaService';
import { ModificarNotaService } from 'src/nota/aplicacion/ModificarNotaService';
import { ImagenEntity } from 'src/nota/infraestructura/Entity/ImagenEntity';
import { NotaEntity } from 'src/nota/infraestructura/Entity/NotaEntity';
import { NotaController } from 'src/nota/infraestructura/NotaController/NotaController';
import { NotaRepositorioAdaptador } from 'src/nota/infraestructura/Repositorio/NotaRepositorioAdaptador';

@Module({
  imports: [TypeOrmModule.forFeature([NotaEntity,ImagenEntity,CarpetaEntity])],
  providers: [CrearNotaService,ModificarNotaService,EliminarNotaService,BuscarNotasService,BuscarNotaPorIdService,BuscarNotasCarpetaService,
  {
    provide: 'NotaRepositorio',
    useClass: NotaRepositorioAdaptador
  }],
  controllers: [NotaController]
})
export class NotaModule {}