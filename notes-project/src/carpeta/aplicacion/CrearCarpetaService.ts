import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Carpeta } from "../dominio/Carpeta";
import { CrearCarpetaDto } from "./DataTransferObjects/CrearCarpetaDto";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";

export class CrearCarpetaService implements IApplicationService<CrearCarpetaDto,Carpeta>{
    
    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(@Inject('CarpetaRepositorio') carpetaRepo: CarpetaRepositorio){
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: CrearCarpetaDto): Promise<Either<Error,Carpeta>>{   
        let carpeta = Carpeta.create(service.nombre);

        if(carpeta.isRight()){
            return await this.carpetaRepositorio.crearCarpeta(carpeta.getRight());
        }
        else{
            return Either.makeLeft<Error,Carpeta>(carpeta.getLeft());
        }
    }

}