import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { Usuario } from "../dominio/Usuario";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";

export class BuscarUsuariosService implements IApplicationService<string,Iterable<Usuario>>{

    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(@Inject('UsuarioRepositorio') usuarioRepo: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: string): Promise<Either<Error,Iterable<Usuario>>>{
            
        console.log(service);
        return await this.usuarioRepositorio.buscarUsuarios();

    }

}