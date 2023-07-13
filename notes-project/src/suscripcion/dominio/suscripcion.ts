import { Either } from "src/utilidad/Either";
import { Optional } from "src/utilidad/Optional";
import { IdSuscripcion } from "./Value Objects/idSuscripcion";
import { EstadoSuscripcion } from "./Value Objects/estadoSuscripcion";
import { FechaInicioSuscripcion } from "./Value Objects/fechaIncioSuscripcion";
import { FechaFinSuscripcion } from "./Value Objects/fechaFinSucripcion";

export class Suscripcion{

    private id: IdSuscripcion;
    private fechaInicio: FechaInicioSuscripcion;
    private fechaFin: FechaFinSuscripcion;
    private estado: EstadoSuscripcion;

    private constructor(fechaInicio: FechaInicioSuscripcion, fechaFin: FechaFinSuscripcion, estado: EstadoSuscripcion,id?: IdSuscripcion){
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;   
    }

    public getId(): string{
        return this.id.getIdSuscricion();
    }

    public getFechaInicio(): Date{
        return this.fechaInicio.getFechaInicioSuscripcion();
    }

    public getFechFin(): Date{
        return this.fechaFin.getFechaFinSuscripcion();
    }

    public getEstado(): string{
        return this.estado.toString();
    }

    static create(fechaInicio: Date, fechaFin: Date, estado: string,id?: string ): Either<Error,Suscripcion>{
        
        let auxiliarEstado: EstadoSuscripcion;

        switch(estado.trim().toLowerCase()){
            case "activa":
            auxiliarEstado = EstadoSuscripcion.Activa;
            break;
            case "inactiva":
            auxiliarEstado = EstadoSuscripcion.Inactiva;
            break;
        }
            
        let auxiliarFechaInicio = FechaInicioSuscripcion.create(fechaInicio);
        if(auxiliarFechaInicio.isLeft()){
            return Either.makeLeft<Error,Suscripcion>(auxiliarFechaInicio.getLeft());
        }
        else{
            let auxiliarFechaFin = FechaFinSuscripcion.create(fechaFin);
            if(auxiliarFechaFin.isLeft()){
                return Either.makeLeft<Error,Suscripcion>(auxiliarFechaFin.getLeft());
            }
                return Either.makeRight<Error,Suscripcion>(new Suscripcion(auxiliarFechaInicio.getRight(),auxiliarFechaFin.getRight(),auxiliarEstado,IdSuscripcion.create(id)));
                        
            }
        }
    }