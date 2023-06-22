import { Either } from "src/utilidad/Either";
import { IdCarpeta } from "./ValueObject/IdCarpeta";
import { NombreCarpeta } from "./ValueObject/NombreCarpeta";

export class Carpeta{
    
    private id: IdCarpeta;
    private nombre: NombreCarpeta;

    private constructor(nombre: NombreCarpeta, id?: IdCarpeta){
        this.id = id;
        this.nombre = nombre;
    }

    public getId(): string{
        return this.id.getIDCarpeta();
    }

    public getNombre(): string{
        return this.nombre.getNombreCarpeta();
    }

    static create(nombre: string, id?: string): Either<Error,Carpeta>{
        const nombreCarpeta = NombreCarpeta.create(nombre);
        if(nombreCarpeta.isRight()){
            return Either.makeRight<Error,Carpeta>(new Carpeta(nombreCarpeta.getRight(),IdCarpeta.create(id)));
        }
        else{
            return Either.makeLeft<Error,Carpeta>(nombreCarpeta.getLeft());
        }
    }

}