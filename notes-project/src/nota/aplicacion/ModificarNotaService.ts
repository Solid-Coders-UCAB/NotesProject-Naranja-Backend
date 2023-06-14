import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { ModificarNotaDto } from "../infraestructura/DataTransferObjects/ModificarNotaDto";
import { Nota } from "../dominio/Nota";
import { Either } from "src/utilidad/Either";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject, Injectable } from "@nestjs/common";
import { NotaRepositorioAdaptador } from "../infraestructura/Repositorio/NotaRepositorioAdaptador";

@Injectable()
export class ModificarNotaService implements IApplicationService<ModificarNotaDto,Nota>{
    
    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject(NotaRepositorioAdaptador) notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: ModificarNotaDto): Promise<Either<Error,Nota>>{
        const id : string = service.idNota;
        let nota = Nota.create(service.fechaCreacion, service.fechaModificacion, service.estado, service.titulo, service.cuerpo, service.longitud, service.latitud);
        
        if(nota.isRight()){

            return await this.notaRepositorio.modificarNota(nota.getRight(),id);
        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }
    }
}