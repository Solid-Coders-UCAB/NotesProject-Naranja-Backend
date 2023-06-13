import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Repository } from "typeorm";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotaRepositorioAdaptador implements NotaRepositorio{

    constructor(
        @InjectRepository(NotaEntity)
        private readonly repositorio: Repository<NotaEntity>,
    ){}

    async crearNota(nota: Nota): Promise<Either<Error,Nota>> {

        const note : NotaEntity = {
            id: nota.getId(),
            titulo: nota.getTitulo(),
            cuerpo: nota.getCuerpo(),
            fechaCreacion: nota.getFechaCreacion(),
            fechaModificacion: nota.getFechaModificacion(),
            latitud: nota.getLatitud(),
            longitud: nota.getLongitud(),
            estado: nota.getEstado()
        };

        const result = await this.repositorio.save(note);
        if(result){
            return Either.makeRight<Error,Nota>(nota);
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error de la base de datos'));
        }
        
    }

}