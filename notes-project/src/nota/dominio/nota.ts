import { IdNota } from "./ValueObject/IdNota";
import { TituloNota } from "./ValueObject/TituloNota";
import { CuerpoNota } from "./ValueObject/CuerpoNota";
import { FechaCreacionNota } from "./ValueObject/FechaCreacionNota";
import { FechaModificacionNota } from "./ValueObject/FechaModificacionNota";
import { EstadoNota } from "./ValueObject/EstadoNota";

export class Nota{

    private id: IdNota;
    private titulo?: TituloNota;
    private cuerpo?: CuerpoNota;
    private fechaCreacion: FechaCreacionNota;
    private fechaModificacion: FechaModificacionNota;
    private estado: EstadoNota;

    constructor(id: IdNota, fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo?: TituloNota, cuerpo?: CuerpoNota){
        this.id = id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.estado = estado;
    }

    public getId(): IdNota{
        return this.id;
    }

    public getTitulo(): TituloNota{
        return this.titulo;
    }

    public getCuerpo(): CuerpoNota{
        return this.cuerpo;
    }

    public getFechaCreacion(): FechaCreacionNota{
        return this.fechaCreacion;
    }

    public getFechaModificacion(): FechaModificacionNota{
        return this.fechaModificacion;
    }

    public getEstado(): EstadoNota{
        return this.estado;
    }

    public setEstado(estado: EstadoNota): void{
        this.estado = estado;
    }

    static create(id: IdNota, fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo: TituloNota, cuerpo: CuerpoNota): Nota{
        return new Nota(id, fechaCreacion, fechaModificacion, estado, titulo, cuerpo);
    }

}