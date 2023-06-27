import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { EliminarEtiquetaDto } from "./Dto/EliminarEtiquetaDto";
import { EtiquetaRepositorio } from "../dominio/EtiquetaRepositorio";

export class EliminarEtiquetaService implements IApplicationService<EliminarEtiquetaDto,string>{

    private readonly carpetaRepositorio: EtiquetaRepositorio

    constructor(@Inject('EtiquetaRepositorio') notaRepo: EtiquetaRepositorio) {
        this.carpetaRepositorio = notaRepo;
    }

    async execute(service: EliminarEtiquetaDto): Promise<Either<Error,string>>{

        
        if(service){

            return await this.carpetaRepositorio.eliminarEtiqueta(service.idEtiqueta);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error con el Dto'));
        }

    }

    
}