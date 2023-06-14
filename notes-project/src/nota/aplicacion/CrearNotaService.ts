import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { CrearNotaDto } from "src/nota/infraestructura/DataTransferObjects/CrearNotaDto";
import { Either } from "src/utilidad/Either";
import { Nota } from "src/nota/dominio/Nota";
import { Injectable,Inject } from "@nestjs/common";
import { NotaRepositorioAdaptador } from "src/nota/infraestructura/Repositorio/NotaRepositorioAdaptador";

@Injectable()
export class CrearNotaService implements IApplicationService<CrearNotaDto,Nota>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject(NotaRepositorioAdaptador) notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: CrearNotaDto): Promise<Either<Error,Nota>>{

        let nota = Nota.create(service.fechaCreacion, service.fechaModificacion, service.estado, service.titulo, service.cuerpo, service.longitud, service.latitud);
        
        if(nota.isRight()){

            return await this.notaRepositorio.crearNota(nota.getRight());
        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }

    }
}