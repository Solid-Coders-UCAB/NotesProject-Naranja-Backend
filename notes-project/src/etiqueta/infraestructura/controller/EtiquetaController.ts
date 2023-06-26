import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BuscarEtiquetaIdService } from "src/etiqueta/aplicacion/BuscarEtiquetaIdService";
import { BuscarEtiquetasService } from "src/etiqueta/aplicacion/BuscarEtiquetasService";
import { CrearEtiquetaService } from "src/etiqueta/aplicacion/CrearEtiquetaService";
import { BuscarEtiquetaIdDto } from "src/etiqueta/aplicacion/Dto/BuscarEtiquetaIdDto";
import { CrearEtiquetaDto } from "src/etiqueta/aplicacion/Dto/CrearEtiquetaDto";
import { EliminarEtiquetaDto } from "src/etiqueta/aplicacion/Dto/EliminarEtiquetaDto";
import { ModificarEtiquetaDto } from "src/etiqueta/aplicacion/Dto/ModificarEtiquetaDto";
import { EliminarEtiquetaService } from "src/etiqueta/aplicacion/EliminarEtiquetaService";
import { ModificarEtiquetaService } from "src/etiqueta/aplicacion/ModificarEtiquetaService";


@Controller('etiqueta')
export class EtiquetaController {

    constructor(private readonly crearEtiqueta: CrearEtiquetaService,
                private readonly modificarEtiqueta: ModificarEtiquetaService,
                private readonly eliminarEtiqueta: EliminarEtiquetaService,
                private readonly buscarEtiquetas: BuscarEtiquetasService,
                private readonly buscarEtiqueta:BuscarEtiquetaIdService){}

    @Post('/create')
    async create(@Res() response, @Body() body: CrearEtiquetaDto){
        const result = await this.crearEtiqueta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarEtiquetaDto){
        const result = await this.modificarEtiqueta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }

    @Delete('/delete')
    async delete(@Res() response, @Body() body: EliminarEtiquetaDto){
        const result = await this.eliminarEtiqueta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Get('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarEtiquetas.execute('Buscar todas las carpetas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }    
    


    @Get('/findById')
    async findById(@Res() response, @Body() body: BuscarEtiquetaIdDto){
        let result = await this.buscarEtiqueta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
}