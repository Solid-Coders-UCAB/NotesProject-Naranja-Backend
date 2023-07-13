import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { ModificarNotaDto } from "./DataTransferObjects/ModificarNotaDto";
import { Nota } from "../dominio/Nota";
import { Either } from "src/utilidad/Either";
import { NotaRepositorio } from "../dominio/NotaRepositorio";

export class ModificarNotaService implements IApplicationService<ModificarNotaDto,Nota>{
    
    private readonly notaRepositorio: NotaRepositorio

    constructor(notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: ModificarNotaDto): Promise<Either<Error,Nota>>{
        
               
        let nota = Nota.create(service.fechaCreacion,
                                 service.fechaModificacion, 
                                 service.estado, service.titulo,
                                  service.cuerpo,  service.idCarpeta, service.longitud,
                                  service.latitud,
                                  service.etiquetas,service.idNota);
        
        if(nota.isRight()){
            const notaC = await this.notaRepositorio.modificarNota(nota.getRight());
            
            //await this.notaRepositorio.guardarImagen(nota.getRight().getId(),imag);
            return notaC;
            
        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }
    }
}