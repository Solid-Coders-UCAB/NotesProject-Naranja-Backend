export class FechaModificacionNota {
    private fecha: Date;

    constructor(fecha:Date) {
        this.fecha = fecha;
    }

    getFechaModificacionNota(): Date{
        return this.fecha;
    }

}