import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { CrearNotaDto } from "src/nota/aplicacion/DataTransferObjects/CrearNotaDto";
import { Either } from "src/utilidad/Either";
import { Nota } from "src/nota/dominio/Nota";
import { Inject } from "@nestjs/common";

export class CrearNotaService implements IApplicationService<CrearNotaDto,Nota>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(@Inject('NotaRepositorio') notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: CrearNotaDto): Promise<Either<Error,Nota>>{

        const imag = service.imagen.map((i) => {
            return  i.buffer
            });


        let nota = Nota.create(service.fechaCreacion, service.fechaModificacion, service.estado, 
            service.titulo, service.cuerpo, service.idCarpeta,service.longitud, service.latitud,imag,service.etiquetas);
        
        if(nota.isRight()){

            const notaC = await this.notaRepositorio.crearNota(nota.getRight());
            //await this.notaRepositorio.guardarImagen(nota.getRight().getId(),imag);
            return notaC;

        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }

    }
}