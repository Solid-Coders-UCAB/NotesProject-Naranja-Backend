import { Either } from "src/utilidad/Either";
import { Carpeta } from "./Carpeta";

export interface CarpetaRepositorio {
    crearCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>>;
    buscarCarpetas(): Promise<Either<Error, Carpeta[]>>;
    buscarCarpeta(id: string): Promise<Either<Error, Carpeta>>;
    modificarCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>>;
    eliminarCarpeta(id: string): Promise<Either<Error, string>>;
}