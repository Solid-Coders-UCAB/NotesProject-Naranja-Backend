import { Body, Controller, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { CrearCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/CrearCarpetaDto";
import { CarpetaRepositorioAdaptador } from "src/carpeta/infraestructura/Repositorio/CarpetaRepositorioAdaptador";
import { BuscarUsuarioCorreoClaveService } from "src/usuario/aplicacion/BuscarUsuarioCorreoClaveService";
import { BuscarUsuarioPorIdService } from "src/usuario/aplicacion/BuscarUsuarioPorIdService";
import { BuscarUsuariosService } from "src/usuario/aplicacion/BuscarUsuariosService";
import { BuscarUsuarioCorreoClaveDto } from "src/usuario/aplicacion/DataTransferObject/BuscarUsuarioCorreoClaveDto";
import { BuscarUsuarioIdDto } from "src/usuario/aplicacion/DataTransferObject/BuscarUsuarioIdDto";
import { ModificarUsuarioDto } from "src/usuario/aplicacion/DataTransferObject/ModificarUsuarioDto";
import { RegistrarUsuarioDto } from "src/usuario/aplicacion/DataTransferObject/RegistrarUsuarioDto";
import { ModificarUsuarioService } from "src/usuario/aplicacion/ModificarUsuarioService";
import { RegistrarUsuarioService } from "src/usuario/aplicacion/RegistrarUsuarioService";
import { UsuarioRepositorioAdaptador } from "../Repositorio/UsuarioRepositorioAdaptador";

@Controller('usuario')
export class UsuarioController {

    constructor(private registrarUsuario: RegistrarUsuarioService,
                private crearCarpeta: CrearCarpetaService,
                private modificarUsuario: ModificarUsuarioService,
                private buscarUsuarios: BuscarUsuariosService,
                private buscarUsuarioId: BuscarUsuarioPorIdService,
                private buscarUsuarioCorreoClave: BuscarUsuarioCorreoClaveService,
                private readonly carpetaRepositorio: CarpetaRepositorioAdaptador,
                private readonly usuarioRepositorio: UsuarioRepositorioAdaptador,){
                    this.crearCarpeta = new CrearCarpetaService(this.carpetaRepositorio);
                    this.registrarUsuario = new RegistrarUsuarioService(this.usuarioRepositorio);
                    this.modificarUsuario = new ModificarUsuarioService(this.usuarioRepositorio);
                    this.buscarUsuarios = new BuscarUsuariosService(this.usuarioRepositorio);
                    this.buscarUsuarioId = new BuscarUsuarioPorIdService(this.usuarioRepositorio);
                    this.buscarUsuarioCorreoClave = new BuscarUsuarioCorreoClaveService(this.usuarioRepositorio);

                }

    @Post('/create')
    async create(@Res() response, @Body() body: RegistrarUsuarioDto){
        let result = await this.registrarUsuario.execute(body);
        if(result.isRight()){

            const carp: CrearCarpetaDto ={
                nombre: 'Carpeta Predeterminada',
                predeterminada: true,
                idUsuario: result.getRight().getId(),
            }

            let result2 = await this.crearCarpeta.execute(carp);
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarUsuarios.execute('BuscarUsuariosService');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findById')
    async findById(@Res() response, @Body() body: BuscarUsuarioIdDto){
        let result = await this.buscarUsuarioId.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findByEmailPassword')
    async findByEmailPassword(@Res() response, @Body() body: BuscarUsuarioCorreoClaveDto){
        let result = await this.buscarUsuarioCorreoClave.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarUsuarioDto){
        let result = await this.modificarUsuario.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}