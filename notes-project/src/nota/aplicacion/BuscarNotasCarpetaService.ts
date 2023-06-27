import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { Nota } from "../dominio/Nota";
import { BuscarNotasCarpetaDto } from "./DataTransferObjects/BuscarNotasCarpetaDto";

export class BuscarNotasCarpetaService implements IApplicationService<BuscarNotasCarpetaDto,Nota[]>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: BuscarNotasCarpetaDto): Promise<Either<Error,Nota[]>>{
        console.log(service.idCarpeta)
        return await this.notaRepositorio.buscarNotasPorCarpeta(service.idCarpeta);

    }

    
}