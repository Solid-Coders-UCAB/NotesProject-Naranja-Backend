import { Body, HttpCode, HttpStatus, Inject, Post} from "@nestjs/common";
import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";


export class NotaController {

    constructor(@Inject(NotaRepositorioAdaptador) private readonly repositorio: NotaRepositorioAdaptador){};

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() nota:Nota){
        return await this.repositorio.saveNota(nota);
    }

}