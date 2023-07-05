import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { BuscarUsuarioCorreoClaveDto } from "./DataTransferObject/BuscarUsuarioCorreoClaveDto";
import { Usuario } from "../dominio/Usuario";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";

export class BuscarUsuarioCorreoClaveService implements IApplicationService<BuscarUsuarioCorreoClaveDto,Usuario>{
    private readonly usuarioRepositorio: UsuarioRepositorio;
    
    constructor(@Inject('UsuarioRepositorio')usuarioRepo: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: BuscarUsuarioCorreoClaveDto): Promise<Either<Error,Usuario>>{
        return await this.usuarioRepositorio.buscarUsuarioPorCorreoClave(service.correo,service.clave);
    }

}