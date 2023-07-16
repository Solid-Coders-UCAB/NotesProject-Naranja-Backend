import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { RepositorioSuscripcionAdaptador } from "../Repositorio/RepositorioSuscripcionAdaptador";
import { CrearSuscripcionService } from "src/suscripcion/aplicacion/CrearSuscripcionService";
import { CrearSuscripcionDto } from "src/suscripcion/aplicacion/Dto/CrearSuscipcionDto";
import { ModificarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/ModificarSuscripcionDto";
import { ModificarSuscripcionService } from "src/suscripcion/aplicacion/ModificarSuscripcionService";
import { EliminarSuscripcionService } from "src/suscripcion/aplicacion/EliminarSuscripcionService";
import { EliminarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/EliminarSuscripcionDto";
import { BuscarSuscripcionesService } from "src/suscripcion/aplicacion/BuscarSuscripcionesService";
import { BuscarSuscripcionPorId } from "src/suscripcion/aplicacion/BuscarSuscripcionService";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";
import { Repository } from "typeorm";
import { BuscarSuscripcionUsuarioDto } from "src/suscripcion/aplicacion/Dto/BuscarSuscripcionusuarioDto";
import { BuscarSuscripcionUsuarioService } from "src/suscripcion/aplicacion/BuscarSuscripcionUsuarioService";
import { BuscarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/BuscarSuscripcionesDto";



@Controller('suscripcion')
export class SuscripcionController {

    constructor(@InjectRepository(UsuarioEntity)
                private readonly repositorioUsuario: Repository<UsuarioEntity>,
                private crearEtiqueta: CrearSuscripcionService,
                private modificarSuscripcion: ModificarSuscripcionService,
                private eliminarSuscripcion: EliminarSuscripcionService,
                private buscarSuscripciones: BuscarSuscripcionesService,
                private bucarSuscripcion: BuscarSuscripcionPorId,
                private buscarSuscripcionPorUsuario: BuscarSuscripcionUsuarioService,
                private readonly suscripcionRepositorio: RepositorioSuscripcionAdaptador){
                    this.crearEtiqueta = new CrearSuscripcionService(this.suscripcionRepositorio);
                    this.modificarSuscripcion = new ModificarSuscripcionService(this.suscripcionRepositorio)
                    this.eliminarSuscripcion = new EliminarSuscripcionService(this.suscripcionRepositorio)
                    this.buscarSuscripciones = new BuscarSuscripcionesService(this.suscripcionRepositorio)
                    this.bucarSuscripcion = new BuscarSuscripcionPorId(this.suscripcionRepositorio)
                    this.buscarSuscripcionPorUsuario = new BuscarSuscripcionUsuarioService(this.suscripcionRepositorio)
                }

    @Post('/create')
    async create(@Res() response, @Body() body: CrearSuscripcionDto){
        console.log("controller",body)
        const result = await this.crearEtiqueta.execute(body);
        if(result.isRight()){  
            const usuario = await this.repositorioUsuario.findOneBy({id:body.idUsuario});
            //console.log("controller usuario",usuario)
            usuario.suscripcion = true;
            await this.repositorioUsuario.save(usuario)
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
            const usuario = await this.repositorioUsuario.findOneBy({id:body.idUsuario});
            //console.log("controller usuario",usuario)
            usuario.suscripcion = false;
            await this.repositorioUsuario.save(usuario)
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Post('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarSuscripciones.execute('Buscar todas las suscripciones');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }    
    


    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarSuscripcionDto){
        let result = await this.bucarSuscripcion.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarSuscripcionUsuarioDto){
        let result = await this.buscarSuscripcionPorUsuario.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}