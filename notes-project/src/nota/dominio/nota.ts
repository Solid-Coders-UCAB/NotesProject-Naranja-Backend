import { IdNota } from "./ValueObject/IdNota";
import { TituloNota } from "./ValueObject/TituloNota";
import { CuerpoNota } from "./ValueObject/CuerpoNota";
import { FechaCreacionNota } from "./ValueObject/FechaCreacionNota";
import { FechaModificacionNota } from "./ValueObject/FechaModificacionNota";
import { EstadoNota } from "./ValueObject/EstadoNota";
import { Geolocalizacion } from "./ValueObject/Geolocalizacion";
import { Either } from "src/utilidad/Either";

export class Nota{

    private id: IdNota;
    private titulo: TituloNota;
    private cuerpo: CuerpoNota;
    private fechaCreacion: FechaCreacionNota;
    private fechaModificacion: FechaModificacionNota;
    private estado: EstadoNota;
    private geolacalizacion: Geolocalizacion;

    private constructor(id: IdNota, fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo: TituloNota, cuerpo: CuerpoNota,geoloalizacion:Geolocalizacion){
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

    public getEstado(): string{
        return this.estado.toString();
    }

    public getLatitud(): number{
        return this.geolacalizacion.getLatitud();
    }

    
    public getLongitud(): number{
        return this.geolacalizacion.getLongitud();
    }

    public setTitulo(titulo: string): void{
        this.titulo = TituloNota.create(titulo).getRight();
    }

    public setCuerpo(cuerpo: string): void{
        this.cuerpo = CuerpoNota.create(cuerpo).getRight();
    }

    public setFechaModificacion(fechaModificacion: Date): void{
        this.fechaModificacion = FechaModificacionNota.create(fechaModificacion).getRight();
    }

    public setEstado(estado: string): void{
        switch(estado.trim().toLowerCase()){
            case "pendienteporguardar":
            this.estado = EstadoNota.Pendiente;
            break;
            case "guardada":
            this.estado = EstadoNota.Guardada;
            break;
            case "eliminada":
            this.estado = EstadoNota.Eliminada;
            break;
            default:
            this.estado = EstadoNota.Pendiente;
            break;
        }
    }

    public setGeolocalizacion(longitud: number, latitud: number): void{
        this.geolacalizacion = Geolocalizacion.create(longitud,latitud).getRight();
    }

    static create(fechaCreacion: Date, fechaModificacion: Date, estado: string, titulo: string, cuerpo: string,longitud: number, latitud: number): Either<Error,Nota>{
        
        let auxiliarEstado: EstadoNota;

        switch(estado.trim().toLowerCase()){
            case "pendienteporguardar":
            auxiliarEstado = EstadoNota.Pendiente;
            break;
            case "guardada":
            auxiliarEstado = EstadoNota.Guardada;
            break;
            case "eliminada":
            auxiliarEstado = EstadoNota.Eliminada;
            break;
            default:
            auxiliarEstado = EstadoNota.Pendiente;
            break;

        }

        let auxiliarFechaCreacion = FechaCreacionNota.create(fechaCreacion);
        let auxiliarFechaModificacion = FechaModificacionNota.create(fechaModificacion);
        let auxiliarTitulo = TituloNota.create(titulo);
        let auxiliarCuerpo = CuerpoNota.create(cuerpo);
        let auxiliarGeolocalizacion = Geolocalizacion.create(longitud,latitud);

        if(auxiliarFechaCreacion.isRight() && auxiliarFechaModificacion.isRight() && auxiliarTitulo.isRight() && auxiliarCuerpo.isRight() && auxiliarGeolocalizacion.isRight()){
            return Either.makeRight<Error,Nota>(new Nota(IdNota.create(), 
                                                auxiliarFechaCreacion.getRight(), 
                                                auxiliarFechaModificacion.getRight(),
                                                auxiliarEstado,  
                                                auxiliarTitulo.getRight(), 
                                                auxiliarCuerpo.getRight(),
                                                auxiliarGeolocalizacion.getRight()));
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('Error al crear la nota'));
        }
        
    }

}