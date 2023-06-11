import { Nota } from "./Nota";
import { Either} from "src/utilidad/Either"

export interface NotaRepositorio{

    save(nota: Nota): Promise<Either<string,Error>>;

}