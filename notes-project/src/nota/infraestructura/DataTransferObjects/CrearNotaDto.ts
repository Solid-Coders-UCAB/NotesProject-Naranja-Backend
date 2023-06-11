import { EstadoNota} from "src/nota/dominio/ValueObject/EstadoNota";

export class CrearNotaDto{

    fechaModificacion: Date;
    fechaCreacion: Date;
    estado: EstadoNota;
    cuerpo?: string;
    titulo?: string;
    
}