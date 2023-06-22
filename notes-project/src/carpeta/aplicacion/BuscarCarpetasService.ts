import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Carpeta } from "../dominio/Carpeta";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";

export class BuscarCarpetasService implements IApplicationService<string,Carpeta[]>{

    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(@Inject('CarpetaRepositorio') carpetaRepo: CarpetaRepositorio) {
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: string): Promise<Either<Error,Carpeta[]>>{
            
        console.log(service);
        return await this.carpetaRepositorio.buscarCarpetas();

    }

}