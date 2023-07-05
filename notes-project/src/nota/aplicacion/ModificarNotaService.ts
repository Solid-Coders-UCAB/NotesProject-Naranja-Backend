import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { ModificarNotaDto } from "./DataTransferObjects/ModificarNotaDto";
import { Nota } from "../dominio/Nota";
import { Either } from "src/utilidad/Either";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Inject } from "@nestjs/common";
import e from "express";

export class ModificarNotaService implements IApplicationService<ModificarNotaDto,Nota>{
    
    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: ModificarNotaDto): Promise<Either<Error,Nota>>{
        
        const imag = service.imagen.map((i) => {
            return  i.buffer
            });
        
               
        let nota = Nota.create(service.fechaCreacion,
                                 service.fechaModificacion, 
                                 service.estado, service.titulo,
                                  service.cuerpo,  service.idCarpeta, service.longitud,
                                  service.latitud,
                                   imag,service.etiquetas,service.idNota);
        
        if(nota.isRight()){
            await this.notaRepositorio.eliminarImagen(nota.getRight().getId());
            const notaC = await this.notaRepositorio.modificarNota(nota.getRight());
            
            //await this.notaRepositorio.guardarImagen(nota.getRight().getId(),imag);
            return notaC;
            
        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }
    }
}