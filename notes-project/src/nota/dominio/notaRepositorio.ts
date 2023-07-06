import { Etiqueta } from "src/etiqueta/dominio/etiqueta";
import { Nota } from "./Nota";
import { Either} from "src/utilidad/Either"

export interface NotaRepositorio{

    crearNota(nota: Nota): Promise<Either<Error,Nota>>;
    buscarNotas(): Promise<Either<Error,Iterable<Nota>>>;
    modificarNota(nota: Nota): Promise<Either<Error,Nota>>;
    eliminarNota(id:string): Promise<Either<Error,string>>;
    buscarNota(id:string): Promise<Either<Error,Nota>>;
    buscarNotasPorCarpeta(idCarpeta:string): Promise<Either<Error,Iterable<Nota>>>;
    //buscarNotasEliminadasUsuario(idUsuario:string): Promise<Either<Error,Iterable<Nota>>>;

}