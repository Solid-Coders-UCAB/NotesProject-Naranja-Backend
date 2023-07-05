import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";
import { CarpetaRepositorioAdaptador } from "src/carpeta/infraestructura/Repositorio/CarpetaRepositorioAdaptador";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { BuscarUsuarioCorreoClaveService } from "src/usuario/aplicacion/BuscarUsuarioCorreoClaveService";
import { BuscarUsuarioPorIdService } from "src/usuario/aplicacion/BuscarUsuarioPorIdService";
import { BuscarUsuariosService } from "src/usuario/aplicacion/BuscarUsuariosService";
import { ModificarUsuarioService } from "src/usuario/aplicacion/ModificarUsuarioService";
import { RegistrarUsuarioService } from "src/usuario/aplicacion/RegistrarUsuarioService";
import { UsuarioController } from "src/usuario/infraestructura/Controller/UsuarioController";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";
import { UsuarioRepositorioAdaptador } from "src/usuario/infraestructura/Repositorio/UsuarioRepositorioAdaptador";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity,CarpetaEntity,NotaEntity])],
    providers: [RegistrarUsuarioService,CrearCarpetaService,ModificarUsuarioService,BuscarUsuariosService,BuscarUsuarioPorIdService,BuscarUsuarioCorreoClaveService,
    {
      provide: 'UsuarioRepositorio',
      useClass: UsuarioRepositorioAdaptador
    },
    {
      provide: 'CarpetaRepositorio',
      useClass: CarpetaRepositorioAdaptador
    }],
    controllers: [UsuarioController]
  })
  export class UsuarioModule {}