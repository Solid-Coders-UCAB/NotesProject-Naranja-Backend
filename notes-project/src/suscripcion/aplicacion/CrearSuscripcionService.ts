import { IApplicationService } from "src/interfaces/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { CrearSuscripcionDto } from "./Dto/CrearSuscipcionDto";
import { RepositorioSuscripcion } from "../dominio/RepositorioSuscripcion";
import { Suscripcion } from "../dominio/suscripcion";

export class CrearSuscripcionService implements IApplicationService<CrearSuscripcionDto,Suscripcion>{

    private readonly usuarioRepositorio: RepositorioSuscripcion;

    constructor(suscripcionRepo: RepositorioSuscripcion){
        this.usuarioRepositorio = suscripcionRepo;
    }

    async execute(service: CrearSuscripcionDto): Promise<Either<Error,Suscripcion>>{
        let suscripcion = Suscripcion.create(service.fechaInicio,service.fechaFin,service.estado);

        if(suscripcion.isRight()){
            return await this.usuarioRepositorio.crearSuscripcion(suscripcion.getRight());
        }
        else{
            return Either.makeLeft<Error,Suscripcion>(suscripcion.getLeft());
        }
    }

}