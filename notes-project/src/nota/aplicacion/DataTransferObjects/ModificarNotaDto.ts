import { EstadoNota } from "src/nota/dominio/ValueObject/EstadoNota";


export class ModificarNotaDto {
    idNota : string;
    fechaModificacion: Date;
    fechaCreacion: Date;
    estado: EstadoNota;
    titulo: string;
    cuerpo: string;
    longitud: number;
    latitud: number;

}