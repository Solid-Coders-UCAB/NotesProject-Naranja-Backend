import { Either } from "src/utilidad/Either";

export class NombreCarpeta{
    private nombre: string;

    private constructor(nombre: string){
        this.nombre = nombre;
    }

    getNombreCarpeta(){
        return this.nombre;
    }

    isValid(): boolean{
        return this.nombre.length > 0;
    }

    static create(nombre: string): Either<Error,NombreCarpeta>{
        const nombreCarpeta = new NombreCarpeta(nombre);
        if(nombreCarpeta.isValid()){
            return Either.makeRight<Error,NombreCarpeta>(nombreCarpeta);
        }
        else{
            return Either.makeLeft<Error,NombreCarpeta>(new Error('El nombre de la carpeta no puede estar vacio'));
        }
    }

}
