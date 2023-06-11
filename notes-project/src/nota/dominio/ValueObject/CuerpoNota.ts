export class CuerpoNota {
    private cuerpo: string;

    constructor(cuerpo: string) {
        this.cuerpo = cuerpo;
    }
    
    getCuerpoNota(): string{
        return this.cuerpo;
    }

}