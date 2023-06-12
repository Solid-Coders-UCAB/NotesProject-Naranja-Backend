import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Repository } from "typeorm";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";

export class NotaRepositorioAdaptador extends Repository<NotaEntity> implements NotaRepositorio{

    async saveNota(nota: Nota): Promise<Either<string, Error>> {

        const note: NotaEntity = NotaEntity[
            nota.getId(),
            nota.getTitulo(),
            nota.getCuerpo(),
            nota.getFechaCreacion(),
            nota.getFechaModificacion(),
            nota.getEstado(),
            nota.getLatitud(),
            nota.getLongitud()
        ];
        try{
            const resultado = await this.save(note);
            return Either.makeLeft<string,Error>(resultado.titulo);
        }catch(error){
            return Either.makeRight<string,Error>(error.message);
        }
    }

}