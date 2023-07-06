import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { BuscarNotasEliminadasUsuarioDto } from "./DataTransferObjects/BuscarNotasEliminadasUsuarioDto";
import { Nota } from "../dominio/Nota";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";

export class BuscarNotasEliminadasUsuarioService implements IApplicationService<BuscarNotasEliminadasUsuarioDto,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio;

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio){
        this.notaRepositorio = notaRepo;
    }

    async execute(service: BuscarNotasEliminadasUsuarioDto): Promise<Either<Error,Iterable<Nota>>>{
        return await this.notaRepositorio.buscarNotasEliminadasUsuario(service.idUsuario);
    }

}