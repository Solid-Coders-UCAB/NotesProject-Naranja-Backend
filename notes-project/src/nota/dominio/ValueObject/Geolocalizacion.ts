import { Either } from "src/utilidad/Either";

export class Geolocalizacion {
    private latitud: number;
    private longitud: number;
    private direccion: string;

    private constructor(latitud: number, longitud: number, direccion: string) {
        this.latitud = latitud;
        this.longitud = longitud;
        this.direccion = direccion;
    }

    getLatitud(): number{
        return this.latitud;
    }

    getLongitud(): number{
        return this.longitud;
    }

    getDireccion(): string{
        return this.direccion;
    }

    static create(latitud: number, longitud: number, direccion: string): Either<Error,Geolocalizacion> {
        return Either.makeRight<Error,Geolocalizacion>(new Geolocalizacion(latitud, longitud, direccion));
    }
}