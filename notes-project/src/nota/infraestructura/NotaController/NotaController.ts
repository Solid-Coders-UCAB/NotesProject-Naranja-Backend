import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Post, Put} from "@nestjs/common";
import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";
import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "../DataTransferObjects/CrearNotaDto";
import { ModificarNotaDto } from "../DataTransferObjects/ModificarNotaDto";
import { ModificarNotaService } from "src/nota/aplicacion/ModificarNotaService";

@Controller('nota')
export class NotaController {

    constructor(private readonly crearNotaService: CrearNotaService,private readonly modificarNota: ModificarNotaService) {}

    @Put('/modificate/:id')
    async update(@Body() body: ModificarNotaDto): Promise<string>{
        const result = await this.modificarNota.execute(body);
        if(result.isRight()){
            return 'Modificado exitoso';
        }
        else{
            return result.getLeft().message;
        }
    }

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