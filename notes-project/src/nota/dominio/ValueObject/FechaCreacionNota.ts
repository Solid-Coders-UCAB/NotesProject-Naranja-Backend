export class FechaCreacionNota {
    private fecha: Date;

    constructor(fecha: Date) {
        this.fecha = fecha;
    }

    getFechaCreacion(): Date{
        return this.fecha;
    }

}