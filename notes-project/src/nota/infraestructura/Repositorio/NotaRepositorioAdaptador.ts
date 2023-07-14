import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Not, Repository } from "typeorm";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";
import { EtiquetaEntity } from "src/etiqueta/infraestructura/Entity/EtiquetaEntity";
import { Etiqueta } from "src/etiqueta/dominio/etiqueta";

@Injectable()
export class NotaRepositorioAdaptador implements NotaRepositorio{

    constructor(
        @InjectRepository(NotaEntity)
        private readonly repositorio: Repository<NotaEntity>,
        @InjectRepository(CarpetaEntity)
        private readonly repositorioCarpeta: Repository<CarpetaEntity>
        
    ){}

    async crearNota(nota: Nota): Promise<Either<Error,Nota>> {

        const carp = await this.repositorioCarpeta.findOneBy({id:nota.getIdCarpeta()});


               let etiq = nota.getEtiquetas().map(ima => {
                const im = new EtiquetaEntity();
                im.id = ima;
                return im;
            }) 
        
        const note : NotaEntity = {
            id: nota.getId(),
            titulo: nota.getTitulo(),
            cuerpo: nota.getCuerpo(),
            fechaCreacion: nota.getFechaCreacion(),
            fechaModificacion: nota.getFechaModificacion(),
            latitud: nota.getLatitud(),
            longitud: nota.getLongitud(),
            estado: nota.getEstado(),
            carpeta: carp,
            etiqueta:etiq
        };

        const result = await this.repositorio.save(note);
        if(result){
            return Either.makeRight<Error,Nota>(nota);
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error de la base de datos'));
        }       
    }

    async buscarNotas(): Promise<Either<Error,Iterable<Nota>>> {          
        const result: NotaEntity[] = await this.repositorio.find({relations: ['carpeta'],});
        if(result.length!=0){
            const notas: Nota[] = result.map((nota) =>
                Nota.create(nota.fechaCreacion, 
                    nota.fechaModificacion, 
                    nota.estado, 
                    nota.titulo, 
                    nota.cuerpo, 
                    nota.carpeta.id,
                    nota.longitud, 
                    nota.latitud,
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }),
                    nota.id).getRight());
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarNota(id:string): Promise<Either<Error,Nota>> {
        const result = (await this.repositorio.find({where: {id: id},relations: ['carpeta']})).at(0);
        
        if(result){
            let nota = Nota.create(result.fechaCreacion, result.fechaModificacion, result.estado, result.titulo, 
                result.cuerpo,  result.carpeta.id,result.longitud, result.latitud,result.etiqueta.map(ima => {
                    return ima.id
                }),result.id);
            return Either.makeRight<Error,Nota>(nota.getRight());
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error de la base de datos'));
        }
    }

    async buscarNotasPorCarpeta(idCarpeta: string): Promise<Either<Error,Iterable<Nota>>> {
        console.log(idCarpeta);
        const result: NotaEntity[] = await this.repositorio.find({relations: ['carpeta'],where: {
                                                                    carpeta:{
                                                                        id: idCarpeta
                                                                    },
                                                                    estado:Not('Eliminada')}});
        console.log(idCarpeta);
        if(result.length != 0){
            const notas: Nota[] = result.map((nota) =>
                Nota.create(nota.fechaCreacion, 
                    nota.fechaModificacion, 
                    nota.estado, 
                    nota.titulo, 
                    nota.cuerpo, 
                    nota.carpeta.id,
                    nota.longitud, 
                    nota.latitud, 
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }),
                    nota.id).getRight());
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarNotasEliminadasUsuario(idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        
        const result = await this.repositorio.find({where: {carpeta: {usuario: {id: idUsuario}}, estado: 'Eliminada'}, relations: ['carpeta']});
        if(result.length > 0){
            const notas: Nota[] = result.map((nota) =>
                Nota.create(nota.fechaCreacion, 
                    nota.fechaModificacion, 
                    nota.estado, 
                    nota.titulo, 
                    nota.cuerpo, 
                    nota.carpeta.id,
                    nota.longitud, 
                    nota.latitud, 
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }),
                    nota.id).getRight());
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('Error de la base de datos'));
        }

    }

    async buscarNotasUsuario(idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        
        const result = await this.repositorio.find({where: {carpeta: {usuario: {id: idUsuario}}}, relations: ['carpeta']});
        if(result.length > 0){
            const notas: Nota[] = result.map((nota) =>
                Nota.create(nota.fechaCreacion, 
                    nota.fechaModificacion, 
                    nota.estado, 
                    nota.titulo, 
                    nota.cuerpo, 
                    nota.carpeta.id,
                    nota.longitud, 
                    nota.latitud, 
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }),
                    nota.id).getRight());
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('Error de la base de datos'));
        }
    }

    async modificarNota(nota: Nota): Promise<Either<Error, Nota>> {

        let notaId = await this.repositorio.findOneBy({id:nota.getId()});
        const carp = await this.repositorioCarpeta.findOneBy({id:nota.getIdCarpeta()});


               let etiq = nota.getEtiquetas().map(ima => {
                const im = new EtiquetaEntity();
                im.id = ima;
                return im;
            })    

            console.log("repo",etiq)

        const note : NotaEntity = {
            id: notaId.id = nota.getId(),
            titulo: notaId.titulo= nota.getTitulo(),
            cuerpo: notaId.cuerpo = nota.getCuerpo(),
            fechaCreacion: notaId.fechaCreacion = nota.getFechaCreacion(),
            fechaModificacion: notaId.fechaModificacion = nota.getFechaModificacion(),
            latitud: notaId.latitud = nota.getLatitud(),
            longitud: notaId.longitud = nota.getLongitud(),
            estado: notaId.estado =nota.getEstado(),
            carpeta: carp,
            etiqueta:etiq
        }; 
        
        console.log("repo1",note)
        const result = await this.repositorio.save(note);
        if(result){
            return Either.makeRight<Error,Nota>(nota);
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error de la base de datos'));
        }
    }

    async eliminarNota(id:string): Promise<Either<Error,string>> {

        const result = await this.repositorio.delete(id);
        if(result.affected != 0){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }



}