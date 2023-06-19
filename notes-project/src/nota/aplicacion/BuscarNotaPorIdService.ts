import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { BuscarNotaIdDto } from "./DataTransferObjects/BuscarNotaIdDto";

export class BuscarNotaPorIdService implements IApplicationService<BuscarNotaIdDto,any>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: BuscarNotaIdDto): Promise<Either<Error,any>>{
        
        return await this.notaRepositorio.buscarNota(service.idNota);

    }

    
}