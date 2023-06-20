import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { Nota } from "../dominio/Nota";

export class BuscarNotasService implements IApplicationService<string,Nota[]>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: string): Promise<Either<Error,Nota[]>>{

        console.log(service);
        return await this.notaRepositorio.buscarNotas();

    }

    
}