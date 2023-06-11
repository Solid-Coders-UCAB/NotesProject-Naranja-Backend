import { Body, Controller, HttpCode, HttpStatus, Inject, Post} from "@nestjs/common";
import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";

@Controller('nota')
export class NotaController {

    constructor(@Inject(NotaRepositorioAdaptador) private readonly repositorio: NotaRepositorioAdaptador){};

    @Post()
    async save(@Body() nota:Nota){
        return await this.repositorio.saveNota(nota);
    }

}