import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BuscarCarpetaPorIdService } from "src/carpeta/aplicacion/BuscarCarpetaPorIdService";
import { BuscarCarpetasPorUsuarioService } from "src/carpeta/aplicacion/BuscarCarpetasPorUsuarioService";
import { BuscarCarpetasService } from "src/carpeta/aplicacion/BuscarCarpetasService";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { BorrarCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/BorrarCarpetaDto";
import { BuscarCarpetaIdDto } from "src/carpeta/aplicacion/DataTransferObjects/BuscarCarpetaIdDto";
import { BuscarCarpetasUsuarioDto } from "src/carpeta/aplicacion/DataTransferObjects/BuscarCarpetasUsuarioDto";
import { CrearCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/CrearCarpetaDto";
import { ModificarCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/ModificarCarpetaDto";
import { EliminarCarpetaService } from "src/carpeta/aplicacion/EliminarCarpetaService";
import { ModificarCarpetaService } from "src/carpeta/aplicacion/ModificarCarpetaService";
import { CarpetaRepositorioAdaptador } from "../Repositorio/CarpetaRepositorioAdaptador";

@Controller('carpeta')
export class CarpetaController {

    constructor(private crearCarpeta: CrearCarpetaService,
                private buscarCarpetas: BuscarCarpetasService,
                private buscarCarpeta: BuscarCarpetaPorIdService,
                private modificarCarpeta: ModificarCarpetaService,
                private eliminarCarpeta: EliminarCarpetaService,
                private buscarCarpetasUsuario: BuscarCarpetasPorUsuarioService,
                private readonly carpetaRepositorio: CarpetaRepositorioAdaptador){
                    this.crearCarpeta = new CrearCarpetaService(this.carpetaRepositorio);
                    this.buscarCarpetas = new BuscarCarpetasService(this.carpetaRepositorio);
                    this.buscarCarpeta = new BuscarCarpetaPorIdService(this.carpetaRepositorio);
                    this.modificarCarpeta = new ModificarCarpetaService(this.carpetaRepositorio);
                    this.eliminarCarpeta = new EliminarCarpetaService(this.carpetaRepositorio);
                    this.buscarCarpetasUsuario = new BuscarCarpetasPorUsuarioService(this.carpetaRepositorio);
                }

    @Post('/create')
    async create(@Res() response, @Body() body: CrearCarpetaDto){
        const result = await this.crearCarpeta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }

    @Post('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarCarpetas.execute('Buscar todas las carpetas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarCarpetaIdDto){
        let result = await this.buscarCarpeta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarCarpetasUsuarioDto){
        let result = await this.buscarCarpetasUsuario.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Put('/modificate')
    async update(@Res() response, @Body() body: ModificarCarpetaDto){
        const result = await this.modificarCarpeta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Delete('/delete')
    async delete(@Res () response, @Body() body: BorrarCarpetaDto){
        const result = await this.eliminarCarpeta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
}