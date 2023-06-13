import { Nota } from "./Nota";
import { Either} from "src/utilidad/Either"

export interface NotaRepositorio{

    crearNota(nota: Nota): Promise<Either<Error,Nota>>;

}