export class TituloNota {
    private titulo: string;

    constructor(titulo: string) {
        this.titulo = titulo;
    }

    getTituloNota(): string{
        return this.titulo;
        ;
    }
}