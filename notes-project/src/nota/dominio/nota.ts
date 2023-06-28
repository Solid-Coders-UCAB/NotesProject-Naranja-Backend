import { IdNota } from "./ValueObject/IdNota";
import { TituloNota } from "./ValueObject/TituloNota";
import { CuerpoNota } from "./ValueObject/CuerpoNota";
import { FechaCreacionNota } from "./ValueObject/FechaCreacionNota";
import { FechaModificacionNota } from "./ValueObject/FechaModificacionNota";
import { EstadoNota } from "./ValueObject/EstadoNota";
import { Geolocalizacion } from "./ValueObject/Geolocalizacion";
import { Either } from "src/utilidad/Either";
import { IdCarpeta } from "src/carpeta/dominio/ValueObject/IdCarpeta";
import { Optional } from "src/utilidad/Optional";

export class Nota{

    private id: IdNota;
    private titulo: TituloNota;
    private cuerpo: CuerpoNota;
    private fechaCreacion: FechaCreacionNota;
    private fechaModificacion: FechaModificacionNota;
    private estado: EstadoNota;
    private geolocalizacion: Optional<Geolocalizacion>;
    private idCarpeta: IdCarpeta;

    private constructor(fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo: TituloNota, cuerpo: CuerpoNota,geolocalizacion: Optional<Geolocalizacion>, idCarpeta: IdCarpeta, id?: IdNota){
        this.id = id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.estado = estado;
        this.geolocalizacion = geolocalizacion;
        this.idCarpeta = idCarpeta;
    }

    public getId(): string{
        return this.id.getIDNota();
    }

    public getImagen(): Buffer[]{
        return this.cuerpo.getImagenNota();
    }


    public getIdCarpeta(): string{
        return this.idCarpeta.getIDCarpeta();
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

    public getLatitud(){
        if(this.geolocalizacion.hasvalue()){
            return this.geolocalizacion.getValue().getLatitud();
        }
        else{
            return undefined;
        }
    }

    
    public getLongitud(){
        if(this.geolocalizacion.hasvalue()){
            return this.geolocalizacion.getValue().getLongitud();
        }
        else{
            return undefined;
        }
    }


    static create(fechaCreacion: Date, fechaModificacion: Date, estado: string, titulo: string, cuerpo: string, idCarpeta: string, longitud?: number, latitud?: number, imagen?:Buffer[], id?: string ): Either<Error,Nota>{
        
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
        if(auxiliarFechaCreacion.isLeft()){
            return Either.makeLeft<Error,Nota>(auxiliarFechaCreacion.getLeft());
        }
        else{
            let auxiliarFechaModificacion = FechaModificacionNota.create(fechaModificacion);
            if(auxiliarFechaModificacion.isLeft()){
                return Either.makeLeft<Error,Nota>(auxiliarFechaModificacion.getLeft());
            }
            else{
                let auxiliarTitulo = TituloNota.create(titulo);
                if(auxiliarTitulo.isLeft()){
                    return Either.makeLeft<Error,Nota>(auxiliarTitulo.getLeft());
                }
                else{
                    let auxiliarCuerpo = CuerpoNota.create(cuerpo,imagen);
                    if(auxiliarCuerpo.isLeft()){
                        return Either.makeLeft<Error,Nota>(auxiliarCuerpo.getLeft());
                    }
                    else{
                        let auxiliarGeolocalizacion: Optional<Geolocalizacion>;
                        if(latitud && longitud){
                            let auxiliarGeolocalizacion2 = Geolocalizacion.create(longitud,latitud);
                            if(auxiliarGeolocalizacion2.isLeft()){
                                return Either.makeLeft<Error,Nota>(auxiliarGeolocalizacion2.getLeft());
                            }
                            else{
                                auxiliarGeolocalizacion = new Optional<Geolocalizacion>(auxiliarGeolocalizacion2.getRight());
                            }
                        }
                        else{
                            auxiliarGeolocalizacion = new Optional<Geolocalizacion>();
                        }
                        return Either.makeRight<Error,Nota>(new Nota(auxiliarFechaCreacion.getRight(),auxiliarFechaModificacion.getRight(),auxiliarEstado,auxiliarTitulo.getRight(),auxiliarCuerpo.getRight(),auxiliarGeolocalizacion,IdCarpeta.create(idCarpeta),IdNota.create(id)));
                    }
                }
            }
        }
        
        

        
        
    }

}