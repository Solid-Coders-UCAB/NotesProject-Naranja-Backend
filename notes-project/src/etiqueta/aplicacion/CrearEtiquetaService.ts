import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Get, Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { EtiquetaRepositorio } from "../dominio/EtiquetaRepositorio";
import { CrearEtiquetaDto } from "./Dto/CrearEtiquetaDto";
import { Etiqueta } from "../dominio/etiqueta";

export class CrearEtiquetaService implements IApplicationService<CrearEtiquetaDto,Etiqueta>{
    
    private readonly etiquetaRepositorio: EtiquetaRepositorio;

    constructor(@Inject('EtiquetaRepositorio') carpetaRepo: EtiquetaRepositorio){
        this.etiquetaRepositorio = carpetaRepo;
    }

    async execute(service: CrearEtiquetaDto): Promise<Either<Error,Etiqueta>>{   
        let carpeta = Etiqueta.create(service.nombreEtiqueta);

        if(carpeta.isRight()){
            return await this.etiquetaRepositorio.guardarEriqueta(carpeta.getRight());
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(carpeta.getLeft());
        }
    }
}