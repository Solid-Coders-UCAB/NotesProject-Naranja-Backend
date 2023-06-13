import { Body, Controller, HttpCode, HttpStatus, Inject, Post} from "@nestjs/common";
import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";
import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "../DataTransferObjects/CrearNotaDto";

@Controller('nota')
export class NotaController {

    constructor(private readonly crearNotaService: CrearNotaService) {}

    @Post('/create')
    async create(@Body() body: CrearNotaDto): Promise<string>{
        const result = await this.crearNotaService.execute(body);
        if(result.isRight()){
            return 'Guardado exitoso';
        }
        else{
            return result.getLeft().message;
        }
    }

}