import { InjectRepository } from "@nestjs/typeorm";
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";
import { EtiquetaRepositorio } from "src/etiqueta/dominio/EtiquetaRepositorio";
import { Repository } from "typeorm";
import { EtiquetaEntity } from "../Entity/EtiquetaEntity";
import { Etiqueta } from "src/etiqueta/dominio/etiqueta";
import { Either } from "src/utilidad/Either";


export class RepositorioEtiquetaAdaptador implements EtiquetaRepositorio {

    constructor(
        @InjectRepository(EtiquetaEntity)
        private readonly repositorio: Repository<EtiquetaEntity>,
    ){}


    async guardarEriqueta(etiqueta: Etiqueta): Promise<Either<Error, Etiqueta>> {
        const etiquetaEnt : EtiquetaEntity = {
            id: etiqueta.getID(),
            nombre: etiqueta.getNombre()
        };
        const result = await this.repositorio.save(etiquetaEnt);
        if(result){
            return Either.makeRight<Error,Etiqueta>(etiqueta);
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(new Error('Error de la base de datos'));
        }   
    }

    async modificarEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, Etiqueta>> {
        
        const etiquetaEnt : EtiquetaEntity = {
            id: etiqueta.getID(),
            nombre: etiqueta.getNombre()
        };
        const result = await this.repositorio.update(etiqueta.getID(),etiquetaEnt);
        if(result){
            return Either.makeRight<Error,Etiqueta>(etiqueta);
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(new Error('Error de la base de datos'));
        }   
    }

    async eliminarEtiqueta(id:string): Promise<Either<Error,string>> {

        const result = await this.repositorio.delete(id);
        if(result){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }

    async buscarEtiquetas(): Promise<Either<Error, Etiqueta[]>> {
        const result: EtiquetaEntity[] = await this.repositorio.find();
        if(result){
            const etiquetas: Etiqueta[] = result.map((etiqueta) =>
                Etiqueta.create(etiqueta.nombre, etiqueta.id).getRight());
            return Either.makeRight<Error,Etiqueta[]>(etiquetas);
        }
        else{
            return Either.makeLeft<Error,Etiqueta[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarEtiqueta(id: string): Promise<Either<Error, Etiqueta>> {
        const result: EtiquetaEntity = await this.repositorio.findOneBy({id:id});
        if(result){
            const etiqueta: Etiqueta = Etiqueta.create(result.nombre, result.id).getRight();
            return Either.makeRight<Error,Etiqueta>(etiqueta);
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(new Error('Error de la base de datos'));
        }

    }
}