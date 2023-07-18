import { Either } from "src/utilidad/Either";

export interface ILogger{
    log(mensaje: string): Promise<Either<Error,string>>;
}