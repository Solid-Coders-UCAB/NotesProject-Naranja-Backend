import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { Inject } from "@nestjs/common";
import { BuscarEtiquetaIdDto } from "./Dto/BuscarEtiquetaIdDto";
import { EtiquetaRepositorio } from "../dominio/EtiquetaRepositorio";
import { Etiqueta } from "../dominio/etiqueta";

export class BuscarEtiquetaIdService implements IApplicationService<BuscarEtiquetaIdDto,Etiqueta>{

    private readonly carpetaRepositorio: EtiquetaRepositorio;

    constructor(@Inject('EtiquetaRepositorio') carpetaRepo: EtiquetaRepositorio) {
        this.carpetaRepositorio = carpetaRepo;
    }
    
    async execute(service: BuscarEtiquetaIdDto): Promise<Either<Error,Etiqueta>>{
        
        return await this.carpetaRepositorio.buscarEtiqueta(service.idEtiqueta);

    }

}