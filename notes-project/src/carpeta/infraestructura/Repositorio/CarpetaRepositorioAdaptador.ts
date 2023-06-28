import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarpetaRepositorio } from "src/carpeta/dominio/CarpetaRepositorio";
import { Repository } from "typeorm";
import { CarpetaEntity } from "../Entity/CarpetaEntity";
import { Either } from "src/utilidad/Either";
import { Carpeta } from "src/carpeta/dominio/Carpeta";

@Injectable()
export class CarpetaRepositorioAdaptador implements CarpetaRepositorio{

    constructor(
        @InjectRepository(CarpetaEntity)
        private readonly repositorio: Repository<CarpetaEntity>,
    ){}

    async crearCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>> {
        const carpetaEnt : CarpetaEntity = {
            id: carpeta.getId(),
            nombre: carpeta.getNombre() 
        };
        const result = await this.repositorio.save(carpetaEnt);
        if(result){
            return Either.makeRight<Error,Carpeta>(carpeta);
        }
        else{
            return Either.makeLeft<Error,Carpeta>(new Error('Error de la base de datos'));
        }
    }

    async buscarCarpetas(): Promise<Either<Error, Carpeta[]>> {
        const result: CarpetaEntity[] = await this.repositorio.find();
        if(result){
            const carpetas: Carpeta[] = result.map((carpeta) =>
                Carpeta.create(carpeta.nombre, carpeta.id).getRight());
            return Either.makeRight<Error,Carpeta[]>(carpetas);
        }
        else{
            return Either.makeLeft<Error,Carpeta[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarCarpeta(id: string): Promise<Either<Error, Carpeta>> {
        const result = await this.repositorio.findOneBy({id:id});
        if(result){
            const carpeta: Carpeta = Carpeta.create(result.nombre, result.id).getRight();
            return Either.makeRight<Error,Carpeta>(carpeta);
        }
        else{
            return Either.makeLeft<Error,Carpeta>(new Error('Error de la base de datos'));
        }
    }

    async modificarCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>> {
        const carpetaEnt : CarpetaEntity = {
            id: carpeta.getId(),
            nombre: carpeta.getNombre()
        };
        const result = await this.repositorio.update(carpeta.getId(), carpetaEnt);
        if(result){
            return Either.makeRight<Error,Carpeta>(carpeta);
        }
        else{
            return Either.makeLeft<Error,Carpeta>(new Error('Error de la base de datos'));
        }
    }

    async eliminarCarpeta(id: string): Promise<Either<Error, string>> {
        const result = await this.repositorio.delete(id);
        if(result.affected != 0){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }
    
}