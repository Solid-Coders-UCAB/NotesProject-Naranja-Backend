import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorioAdaptador } from "../infraestructura/Repositorio/NotaRepositorioAdaptador";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { BorraNotaDto } from "../infraestructura/DataTransferObjects/BorrarNotaDto";

export class EliminarNotaService implements IApplicationService<BorraNotaDto,string>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject(NotaRepositorioAdaptador) notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: BorraNotaDto): Promise<Either<Error,string>>{

        
        if(service){

            return await this.notaRepositorio.eliminarNota(service.idNota);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error con el Dto'));
        }

    }

    
}