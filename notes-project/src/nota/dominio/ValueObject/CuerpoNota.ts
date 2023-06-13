import { Either } from "src/utilidad/Either";

export class CuerpoNota {
    private cuerpo: string;

    private constructor(cuerpo: string) {
        this.cuerpo = cuerpo;
    }
    
    getCuerpoNota(): string{
        return this.cuerpo;
    }

    static create(cuerpo: string): Either<Error,CuerpoNota> {
        return Either.makeRight<Error,CuerpoNota>(new CuerpoNota(cuerpo));
    }

}