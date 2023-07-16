import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarpetaEntity } from 'src/carpeta/infraestructura/Entity/CarpetaEntity';
import { BuscarNotaPorIdService } from 'src/nota/aplicacion/BuscarNotaPorIdService';
import { BuscarNotasCarpetaService } from 'src/nota/aplicacion/BuscarNotasCarpetaService';
import { BuscarNotasEliminadasUsuarioService } from 'src/nota/aplicacion/BuscarNotasEliminadasUsuarioService';
import { BuscarNotasPorEtiquetaService } from 'src/nota/aplicacion/BuscarNotasPorEtiquetaService';
import { BuscarNotasPorGeolocalizacionService } from 'src/nota/aplicacion/BuscarNotasPorGeolocalizacionService';
import { BuscarNotasPorPalabraClaveService } from 'src/nota/aplicacion/BuscarNotasPorPalabraClaveService';
import { BuscarNotasService } from 'src/nota/aplicacion/BuscarNotasService';
import { BuscarNotasUsuarioService } from 'src/nota/aplicacion/BuscarNotasUsuarioService';
import { CrearNotaService } from 'src/nota/aplicacion/CrearNotaService';
import { EliminarNotaService } from 'src/nota/aplicacion/EliminarNotaService';
import { ModificarNotaService } from 'src/nota/aplicacion/ModificarNotaService';
import { NotaEntity } from 'src/nota/infraestructura/Entity/NotaEntity';
import { TareaEntity } from 'src/nota/infraestructura/Entity/TareaEntity';
import { NotaController } from 'src/nota/infraestructura/NotaController/NotaController';
import { NotaRepositorioAdaptador } from 'src/nota/infraestructura/Repositorio/NotaRepositorioAdaptador';
import { UsuarioEntity } from 'src/usuario/infraestructura/Entity/UsuarioEntity';

@Module({
  imports: [TypeOrmModule.forFeature([NotaEntity,CarpetaEntity,TareaEntity])],
  providers: [CrearNotaService,ModificarNotaService,EliminarNotaService,BuscarNotasService,BuscarNotaPorIdService,
    BuscarNotasCarpetaService,BuscarNotasEliminadasUsuarioService,BuscarNotasUsuarioService,NotaRepositorioAdaptador,
    BuscarNotasPorPalabraClaveService,BuscarNotasPorEtiquetaService,BuscarNotasPorGeolocalizacionService,
  {
    provide: 'NotaRepositorio',
    useClass: NotaRepositorioAdaptador
  }],
  controllers: [NotaController]
})
export class NotaModule {}