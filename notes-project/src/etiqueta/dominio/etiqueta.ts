import { NombreCarpeta } from "src/carpeta/dominio/ValueObject/NombreCarpeta";
import { idEtiqueta } from "./ValueObject/idEtiqueta";
import { Either } from "src/utilidad/Either";



export class Etiqueta {

    private id: idEtiqueta;
    private nombre: NombreCarpeta;

    private constructor( nombre: NombreCarpeta,id?: idEtiqueta){
        this.id = id;
        this.nombre = nombre;
    }

    getID(): string{
        return this.id.getIDCarpeta();
    }

    getNombre(): string{
        return this.nombre.getNombreCarpeta();
    }

    static create(nombre: string, id?: string): Either<Error,Etiqueta>{

        const nombreEtiqueta = NombreCarpeta.create(nombre);
        if(nombreEtiqueta.isRight()){
            return Either.makeRight<Error,Etiqueta>(new Etiqueta(nombreEtiqueta.getRight(),idEtiqueta.create(id)));
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(nombreEtiqueta.getLeft());
        }

    }





}