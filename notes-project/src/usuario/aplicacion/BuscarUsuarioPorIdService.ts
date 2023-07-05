import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { BuscarUsuarioIdDto } from "./DataTransferObject/BuscarUsuarioIdDto";
import { Usuario } from "../dominio/Usuario";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";

export class BuscarUsuarioPorIdService implements IApplicationService<BuscarUsuarioIdDto,Usuario>{

    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(@Inject('UsuarioRepositorio') usuarioRepo: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: BuscarUsuarioIdDto): Promise<Either<Error,Usuario>>{
            
        return await this.usuarioRepositorio.buscarUsuarioPorId(service.idUsuario);

    }
    
}