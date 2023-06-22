import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { ModificarNotaDto } from "./DataTransferObjects/ModificarNotaDto";
import { Nota } from "../dominio/Nota";
import { Either } from "src/utilidad/Either";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject } from "@nestjs/common";

export class ModificarNotaService implements IApplicationService<ModificarNotaDto,Nota>{
    
    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: ModificarNotaDto): Promise<Either<Error,Nota>>{
        let nota = Nota.create(service.fechaCreacion, service.fechaModificacion, service.estado, service.titulo, service.cuerpo, service.longitud, service.latitud, service.idCarpeta,service.idNota);
        
        if(nota.isRight()){

            return await this.notaRepositorio.modificarNota(nota.getRight());
        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }
    }
}