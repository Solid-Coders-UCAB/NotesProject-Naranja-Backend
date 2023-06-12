import { IdNota } from "./ValueObject/IdNota";
import { TituloNota } from "./ValueObject/TituloNota";
import { CuerpoNota } from "./ValueObject/CuerpoNota";
import { FechaCreacionNota } from "./ValueObject/FechaCreacionNota";
import { FechaModificacionNota } from "./ValueObject/FechaModificacionNota";
import { EstadoNota } from "./ValueObject/EstadoNota";
import { Geolocalizacion } from "./ValueObject/Geolocalizacion";

export class Nota{

    private id: IdNota;
    private titulo: TituloNota;
    private cuerpo: CuerpoNota;
    private fechaCreacion: FechaCreacionNota;
    private fechaModificacion: FechaModificacionNota;
    private estado: EstadoNota;
    private geolacalizacion: Geolocalizacion;

    constructor(id: IdNota, fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo: TituloNota, cuerpo: CuerpoNota,geoloalizacion:Geolocalizacion){
        this.id = id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.estado = estado;
        this.geolacalizacion = geoloalizacion;
    }

    public getId(): string{
        return this.id.getIDNota();
    }

    public getTitulo(): string{
        return this.titulo.getTituloNota();
    }

    public getCuerpo(): string{
        return this.cuerpo.getCuerpoNota();
    }

    public getFechaCreacion(): Date{
        return this.fechaCreacion.getFechaCreacion();
    }

    public getFechaModificacion(): Date{
        return this.fechaModificacion.getFechaModificacionNota();
    }

    public getEstado(): EstadoNota{
        return this.estado;
    }

    public getLatitud(): number{
        return this.geolacalizacion.getLatitud();
    }

    
    public getLongitud(): number{
        return this.geolacalizacion.getLongitud();
    }

    static create(id: IdNota, fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo: TituloNota, cuerpo: CuerpoNota,geolacalizacion:Geolocalizacion): Nota{
        return new Nota(id, fechaCreacion, fechaModificacion, estado, titulo, cuerpo,geolacalizacion);
    }

}