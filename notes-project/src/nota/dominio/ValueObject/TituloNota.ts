import { Either } from "src/utilidad/Either";

export class TituloNota {
    private titulo: string;

    private constructor(titulo: string) {
        this.titulo = titulo;
    }

    getTituloNota(): string{
        return this.titulo;
    }

    static create(titulo: string): Either<Error,TituloNota> {
        return Either.makeRight<Error,TituloNota>(new TituloNota(titulo));
    }
}