import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Repository } from "typeorm";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { ImagenEntity } from "../Entity/ImagenEntity";

@Injectable()
export class NotaRepositorioAdaptador implements NotaRepositorio{

    constructor(
        @InjectRepository(NotaEntity)
        private readonly repositorio: Repository<NotaEntity>,
        @InjectRepository(ImagenEntity)
        private readonly repositorioImagen: Repository<ImagenEntity>
        
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
            direccion: nota.getDireccion(),
            estado: nota.getEstado(),
            imagen:[],
            carpeta: nota.getIdCarpeta()
        };

        const result = await this.repositorio.save(note);
        if(result){
            return Either.makeRight<Error,Nota>(nota);
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error de la base de datos'));
        }       
    }

    async buscarNotas(): Promise<Either<Error,Nota[]>> {          
        const result: NotaEntity[] = await this.repositorio.find();
        if(result){
            const notas: Nota[] = result.map((nota) =>
                Nota.create(nota.fechaCreacion, 
                    nota.fechaModificacion, 
                    nota.estado, 
                    nota.titulo, 
                    nota.cuerpo, 
                    nota.carpeta,
                    nota.longitud, 
                    nota.latitud,
                    nota.direccion, 
                    nota.imagen.map(ima=>{
                        return ima.imagen
                    }),
                    nota.id).getRight());
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarNota(id:string): Promise<Either<Error,Nota>> {
        const result = await this.repositorio.findOneBy({id:id});
        const ima = result.imagen.map(ima=>{
            return ima.imagen
        })
        console.log("aqui",ima);
        if(result){
            let nota = Nota.create(result.fechaCreacion, result.fechaModificacion, result.estado, result.titulo, 
                result.cuerpo,  result.carpeta,result.longitud, result.latitud,result.direccion,ima,result.id);
            return Either.makeRight<Error,Nota>(nota.getRight());
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error de la base de datos'));
        }
    }

    async buscarNotasPorCarpeta(idCarpeta: string): Promise<Either<Error, Nota[]>> {
        console.log(idCarpeta);
        const result: NotaEntity[] = await this.repositorio.find({where:{carpeta:idCarpeta}});
        console.log(idCarpeta);
        if(result){
            const notas: Nota[] = result.map((nota) =>
                Nota.create(nota.fechaCreacion, 
                    nota.fechaModificacion, 
                    nota.estado, 
                    nota.titulo, 
                    nota.cuerpo, 
                    nota.carpeta,
                    nota.longitud, 
                    nota.latitud,
                    nota.direccion, 
                    nota.imagen.map(ima=>{
                        return ima.imagen
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

        const note : NotaEntity = {
            id: notaId.id = nota.getId(),
            titulo: notaId.titulo= nota.getTitulo(),
            cuerpo: notaId.cuerpo = nota.getCuerpo(),
            fechaCreacion: notaId.fechaCreacion = nota.getFechaCreacion(),
            fechaModificacion: notaId.fechaModificacion = nota.getFechaModificacion(),
            latitud: notaId.latitud = nota.getLatitud(),
            longitud: notaId.longitud = nota.getLongitud(),
            direccion: notaId.direccion = nota.getDireccion(),
            estado: notaId.estado =nota.getEstado(),
            imagen: [],
            carpeta: notaId.carpeta = nota.getIdCarpeta()
        };  
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
        if(result){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }

    async guardarImagen(id:string,imagen:Buffer[]): Promise<Either<Error,string>> {
        
        const nota =  await this.repositorio.findOneBy({id : id});

        const im = imagen.map((img) => {
            return {
                imagen: img,
                nota: nota
            }
        });
            
        const result = await this.repositorioImagen.save(im);
        if(result){
            return Either.makeRight<Error,string>("Todo bien");
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }


    async eliminarImagen(id:string): Promise<Either<Error,string>> {
        
        const result = await this.repositorioImagen.delete({ nota: { id: id} });
        if(result){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }
}