import { EstadoNota} from "src/nota/dominio/ValueObject/EstadoNota";

export class CrearNotaDto{

    fechaModificacion: Date;
    fechaCreacion: Date;
    estado: EstadoNota;
    titulo: string;
    cuerpo: string;
    longitud?: number;
    latitud?: number;
    direccion?: string;
    imagen?: {buffer: Buffer}[];
    idCarpeta: string;  
}