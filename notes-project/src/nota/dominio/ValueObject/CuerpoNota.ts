import { Either } from "src/utilidad/Either";

export class CuerpoNota {
    [x: string]: any;
    private cuerpo: string;
    private imagen: Buffer[];

    private constructor(cuerpo: string, imagen?: Buffer[]) {
        this.cuerpo = cuerpo;
        this.imagen = imagen;
    }
    
    getCuerpoNota(): string{
        return this.cuerpo;
    }

    getImagenNota(): Buffer[]{
        return this.imagen;
    }

    static create(cuerpo: string,imagen?:Buffer[]): Either<Error,CuerpoNota> {
        return Either.makeRight<Error,CuerpoNota>(new CuerpoNota(cuerpo,imagen));
    }



}