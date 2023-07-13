import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BuscarEtiquetaIdService } from "src/etiqueta/aplicacion/BuscarEtiquetaIdService";
import { BuscarEtiquetasPorUsuarioService } from "src/etiqueta/aplicacion/BuscarEtiquetaPorUsuarioService";
import { BuscarEtiquetasService } from "src/etiqueta/aplicacion/BuscarEtiquetasService";
import { CrearEtiquetaService } from "src/etiqueta/aplicacion/CrearEtiquetaService";
import { BuscarEtiquetaIdDto } from "src/etiqueta/aplicacion/Dto/BuscarEtiquetaIdDto";
import { BuscarEtiquetaPorUsuarioDto } from "src/etiqueta/aplicacion/Dto/BuscarEtiquetaPorUsuarioDto";
import { CrearEtiquetaDto } from "src/etiqueta/aplicacion/Dto/CrearEtiquetaDto";
import { EliminarEtiquetaDto } from "src/etiqueta/aplicacion/Dto/EliminarEtiquetaDto";
import { ModificarEtiquetaDto } from "src/etiqueta/aplicacion/Dto/ModificarEtiquetaDto";
import { EliminarEtiquetaService } from "src/etiqueta/aplicacion/EliminarEtiquetaService";
import { ModificarEtiquetaService } from "src/etiqueta/aplicacion/ModificarEtiquetaService";
import { RepositorioEtiquetaAdaptador } from "../repositorio/RepositorioEtiquetaAdaptador";


@Controller('etiqueta')
export class EtiquetaController {

    constructor(private crearEtiqueta: CrearEtiquetaService,
                private modificarEtiqueta: ModificarEtiquetaService,
                private eliminarEtiqueta: EliminarEtiquetaService,
                private buscarEtiquetas: BuscarEtiquetasService,
                private buscarEtiqueta:BuscarEtiquetaIdService,
                private buscarEtiquetasPorUsuario:BuscarEtiquetasPorUsuarioService,
                private readonly etiquetaRepositorio: RepositorioEtiquetaAdaptador){
                    this.crearEtiqueta = new CrearEtiquetaService(this.etiquetaRepositorio);
                    this.modificarEtiqueta = new ModificarEtiquetaService(this.etiquetaRepositorio);
                    this.eliminarEtiqueta = new EliminarEtiquetaService(this.etiquetaRepositorio);
                    this.buscarEtiquetas = new BuscarEtiquetasService(this.etiquetaRepositorio);
                    this.buscarEtiqueta = new BuscarEtiquetaIdService(this.etiquetaRepositorio);
                    this.buscarEtiquetasPorUsuario = new BuscarEtiquetasPorUsuarioService(this.etiquetaRepositorio);
                }

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

    @Get('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarEtiquetaPorUsuarioDto){
        let result = await this.buscarEtiquetasPorUsuario.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}