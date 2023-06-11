import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { CrearNotaDto } from "src/nota/infraestructura/DataTransferObjects/CrearNotaDto";
import { Either } from "src/utilidad/Either";
import { Nota } from "src/nota/dominio/Nota";
import { IdNota } from "src/nota/dominio/ValueObject/IdNota";
import { FechaCreacionNota } from "src/nota/dominio/ValueObject/FechaCreacionNota";
import { FechaModificacionNota } from "src/nota/dominio/ValueObject/FechaModificacionNota";
import { TituloNota } from "src/nota/dominio/ValueObject/TituloNota";
import { CuerpoNota } from "src/nota/dominio/ValueObject/CuerpoNota";


export class CrearNotaService implements IApplicationService<CrearNotaDto,string>{

    constructor(private readonly notaRepositorio: NotaRepositorio) {}

    async execute(service: CrearNotaDto): Promise<Either<string,Error>>{

        let nota = Nota.create(
            new IdNota,
            new FechaCreacionNota(service.fechaCreacion),
            new FechaModificacionNota(service.fechaModificacion),
            service.estado,
            new TituloNota(service.titulo),
            new CuerpoNota(service.cuerpo)); 
        
        return await this.notaRepositorio.saveNota(nota);

    }
}