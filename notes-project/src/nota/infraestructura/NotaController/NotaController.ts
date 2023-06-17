import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, Post, Put} from "@nestjs/common";
import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";
import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "../DataTransferObjects/CrearNotaDto";
import { ModificarNotaDto } from "../DataTransferObjects/ModificarNotaDto";
import { ModificarNotaService } from "src/nota/aplicacion/ModificarNotaService";
import { EliminarNotaService } from "src/nota/aplicacion/EliminarNotaService";
import { BorraNotaDto } from "../DataTransferObjects/BorrarNotaDto";

@Controller('nota')
export class NotaController {

    constructor(private readonly crearNotaService: CrearNotaService,
        private readonly modificarNota: ModificarNotaService,
        private readonly eliminarNota: EliminarNotaService) {}

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


    @Delete('/delete/:id')
    async delete (@Body() body: BorraNotaDto): Promise<string>{
        const result = await this.eliminarNota.execute(body);
        if(result.isRight()){
            return 'Eliminado exitoso';
        }
        else{
            return result.getLeft().message;
        }

    }

}