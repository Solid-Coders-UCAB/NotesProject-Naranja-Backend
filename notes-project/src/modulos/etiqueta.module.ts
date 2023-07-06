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
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";

@Module({
    imports: [TypeOrmModule.forFeature([EtiquetaEntity,UsuarioEntity])],
    providers: [CrearEtiquetaService,ModificarEtiquetaService,EliminarEtiquetaService,BuscarEtiquetasService,BuscarEtiquetaIdService,BuscarEtiquetasPorUsuarioService,
    {
      provide: 'EtiquetaRepositorio',
      useClass: RepositorioEtiquetaAdaptador
    }],
    controllers: [EtiquetaController]
  })
  export class EtiquetaModule {}