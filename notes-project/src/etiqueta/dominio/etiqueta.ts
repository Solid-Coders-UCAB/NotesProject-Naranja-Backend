import { NombreCarpeta } from "src/carpeta/dominio/ValueObject/NombreCarpeta";
import { idEtiqueta } from "./ValueObject/idEtiqueta";
import { Either } from "src/utilidad/Either";
import { NombreEtiqueta } from "./ValueObject/nombreEtiqueta";



export class Etiqueta {

    private id: idEtiqueta;
    private nombre: NombreEtiqueta;

    private constructor( nombre: NombreEtiqueta,id?: idEtiqueta){
        this.id = id;
        this.nombre = nombre;
    }

    getID(): string{
        return this.id.getIDEtiqueta();
    }

    getNombre(): string{
        return this.nombre.getNombre();
    }

    static create(nombre: string, id?: string): Either<Error,Etiqueta>{

        const nombreEtiqueta = NombreEtiqueta.create(nombre);
        if(nombreEtiqueta.isRight()){
            return Either.makeRight<Error,Etiqueta>(new Etiqueta(nombreEtiqueta.getRight(),idEtiqueta.create(id)));
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(nombreEtiqueta.getLeft());
        }

    }





}