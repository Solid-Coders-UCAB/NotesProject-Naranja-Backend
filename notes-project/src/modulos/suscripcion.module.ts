import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuscarEtiquetaIdService } from "src/etiqueta/aplicacion/BuscarEtiquetaIdService";
import { BuscarEtiquetasPorUsuarioService } from "src/etiqueta/aplicacion/BuscarEtiquetaPorUsuarioService";
import { BuscarEtiquetasService } from "src/etiqueta/aplicacion/BuscarEtiquetasService";
import { CrearEtiquetaService } from "src/etiqueta/aplicacion/CrearEtiquetaService";
import { EliminarEtiquetaService } from "src/etiqueta/aplicacion/EliminarEtiquetaService";
import { ModificarEtiquetaService } from "src/etiqueta/aplicacion/ModificarEtiquetaService";
import { EtiquetaEntity } from "src/etiqueta/infraestructura/Entity/EtiquetaEntity";
import { EtiquetaController } from "src/etiqueta/infraestructura/controller/EtiquetaController";
import { RepositorioEtiquetaAdaptador } from "src/etiqueta/infraestructura/repositorio/RepositorioEtiquetaAdaptador";
import { BuscarSuscripcionPorId } from "src/suscripcion/aplicacion/BuscarSuscripcionService";
import { BuscarSuscripcionesService } from "src/suscripcion/aplicacion/BuscarSuscripcionesService";
import { CrearSuscripcionService } from "src/suscripcion/aplicacion/CrearSuscripcionService";
import { EliminarSuscripcionService } from "src/suscripcion/aplicacion/EliminarSuscripcionService";
import { ModificarSuscripcionService } from "src/suscripcion/aplicacion/ModificarSuscripcionService";
import { SuscripcionController } from "src/suscripcion/infraestructura/Controller/SuscripcionController";
import { SuscripcionEntity } from "src/suscripcion/infraestructura/Entity/SuscripcionEntity";
import { RepositorioSuscripcionAdaptador } from "src/suscripcion/infraestructura/Repositorio/RepositorioSuscripcionAdaptador";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";

@Module({
    imports: [TypeOrmModule.forFeature([SuscripcionEntity])],
    providers: [CrearSuscripcionService,ModificarSuscripcionService,EliminarSuscripcionService,BuscarSuscripcionesService,BuscarSuscripcionPorId,RepositorioSuscripcionAdaptador,
    {
      provide: 'SuscripcionRepositorio',
      useClass: RepositorioSuscripcionAdaptador
    }],
    controllers: [SuscripcionController]
  })
  export class SuscripcionModule {}