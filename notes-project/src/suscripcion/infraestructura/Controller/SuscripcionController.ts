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
import { RepositorioSuscripcionAdaptador } from "../Repositorio/RepositorioSuscripcionAdaptador";
import { CrearSuscripcionService } from "src/suscripcion/aplicacion/CrearSuscripcionService";
import { CrearSuscripcionDto } from "src/suscripcion/aplicacion/Dto/CrearSuscipcionDto";
import { ModificarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/ModificarSuscripcionDto";
import { ModificarSuscripcionService } from "src/suscripcion/aplicacion/ModificarSuscripcionService";
import { EliminarSuscripcionService } from "src/suscripcion/aplicacion/EliminarSuscripcionService";
import { EliminarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/EliminarSuscripcionDto";
import { BuscarSuscripcionesService } from "src/suscripcion/aplicacion/BuscarSuscripcionesService";
import { BuscarSuscripcionPorId } from "src/suscripcion/aplicacion/BuscarSuscripcionService";
import { BuscarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/BuscarSuscripcionesDto";



@Controller('suscripcion')
export class SuscripcionController {

    constructor(private crearEtiqueta: CrearSuscripcionService,
                private modificarSuscripcion: ModificarSuscripcionService,
                private eliminarSuscripcion: EliminarSuscripcionService,
                private buscarSuscripciones: BuscarSuscripcionesService,
                private bucarSuscripcion: BuscarSuscripcionPorId,
                private readonly suscripcionRepositorio: RepositorioSuscripcionAdaptador){
                    this.crearEtiqueta = new CrearSuscripcionService(this.suscripcionRepositorio);
                    this.modificarSuscripcion = new ModificarSuscripcionService(this.suscripcionRepositorio)
                    this.eliminarSuscripcion = new EliminarSuscripcionService(this.suscripcionRepositorio)
                    this.buscarSuscripciones = new BuscarSuscripcionesService(this.suscripcionRepositorio)
                    this.bucarSuscripcion = new BuscarSuscripcionPorId(this.suscripcionRepositorio)
                }

    @Post('/create')
    async create(@Res() response, @Body() body: CrearSuscripcionDto){
        console.log("controller",body)
        const result = await this.crearEtiqueta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarSuscripcionDto){
        const result = await this.modificarSuscripcion.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }

    @Delete('/delete')
    async delete(@Res() response, @Body() body: EliminarSuscripcionDto){
        const result = await this.eliminarSuscripcion.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Get('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarSuscripciones.execute('Buscar todas las suscripciones');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }    
    


    @Get('/findById')
    async findById(@Res() response, @Body() body: BuscarSuscripcionDto){
        let result = await this.bucarSuscripcion.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    // @Get('/findByUser')
    // async findByUser(@Res() response, @Body() body: BuscarEtiquetaPorUsuarioDto){
    //     let result = await this.buscarEtiquetasPorUsuario.execute(body);
    //     if(result.isRight()){
    //         return response.status(HttpStatus.OK).json(result.getRight());
    //     }
    //     else{
    //         return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
    //     }
    // }

}