import { Nota } from "./Nota";
import { Either} from "src/utilidad/Either"

export interface NotaRepositorio{

    crearNota(nota: Nota): Promise<Either<Error,Nota>>;
    buscarNotas(): Promise<Either<Error,Nota[]>>;
    modificarNota(nota: Nota): Promise<Either<Error,Nota>>;
    eliminarNota(id:string): Promise<Either<Error,string>>;
    buscarNota(id:string): Promise<Either<Error,Nota>>;

}