import { Either } from "src/utilidad/Either";
import { AppServiceDecorator } from "./AppServiceDecorator";
import { IApplicationService } from "./IApplicationService";
import { ILogger } from "./ILogger";

export class LoggerDecorator<TService,T> extends AppServiceDecorator<TService,T>{
    
    private logger: ILogger;
    private mensaje: string;

    constructor(logger: ILogger, appService: IApplicationService<TService,T>,mensaje: string){
        super(appService);
        this.logger = logger;
        this.mensaje = mensaje;
    }

    async execute(service: TService): Promise<Either<Error,T>>{
        const result = await super.execute(service);
        let log: Either<Error,string>;
        if(result.isRight()){
            log = await this.logger.log(this.mensaje);
        }
        else{
            log = await this.logger.log(result.getLeft().message);
        }
        return result;
    }

}