import { Nota } from "./Nota";
import { Either} from "src/utilidad/Either"

export interface NotaRepositorio{

    saveNota(nota: Nota): Promise<Either<string,Error>>;

}