import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";
import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "../../aplicacion/DataTransferObjects/CrearNotaDto";
import { ModificarNotaDto } from "../../aplicacion/DataTransferObjects/ModificarNotaDto";
import { ModificarNotaService } from "src/nota/aplicacion/ModificarNotaService";
import { EliminarNotaService } from "src/nota/aplicacion/EliminarNotaService";
import { BorraNotaDto } from "../../aplicacion/DataTransferObjects/BorrarNotaDto";
import { BuscarNotasService } from "src/nota/aplicacion/BuscarNotasService";
import { BuscarNotaPorIdService } from "src/nota/aplicacion/BuscarNotaPorIdService";
import { BuscarNotaIdDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotaIdDto";
import { BuscarNotasCarpetaDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasCarpetaDto";
import { BuscarNotasCarpetaService } from "src/nota/aplicacion/BuscarNotasCarpetaService";
import { BuscarNotasEliminadasUsuarioService } from "src/nota/aplicacion/BuscarNotasEliminadasUsuarioService";
import { BuscarNotasEliminadasUsuarioDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasEliminadasUsuarioDto";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";
import { BuscarNotasUsuarioService } from "src/nota/aplicacion/BuscarNotasUsuarioService";
import { BuscarNotasUsuarioDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasUsuarioDto";

@Controller('nota')
export class NotaController {

    constructor(private crearNotaService: CrearNotaService,
                private modificarNota: ModificarNotaService,
                private eliminarNota: EliminarNotaService,
                private buscarNotas: BuscarNotasService,
                private buscarNotaId: BuscarNotaPorIdService,
                private buscarNotasCarpeta: BuscarNotasCarpetaService,
                private buscarEliminadas: BuscarNotasEliminadasUsuarioService,
                private buscarNotasUsuario: BuscarNotasUsuarioService,
                private readonly notaRepositorio: NotaRepositorioAdaptador) {
                    this.crearNotaService = new CrearNotaService(this.notaRepositorio);
                    this.modificarNota = new ModificarNotaService(this.notaRepositorio);
                    this.eliminarNota = new EliminarNotaService(this.notaRepositorio);
                    this.buscarNotas = new BuscarNotasService(this.notaRepositorio);
                    this.buscarNotaId = new BuscarNotaPorIdService(this.notaRepositorio);
                    this.buscarNotasCarpeta = new BuscarNotasCarpetaService(this.notaRepositorio);
                    this.buscarEliminadas = new BuscarNotasEliminadasUsuarioService(this.notaRepositorio);
                    this.buscarNotasUsuario = new BuscarNotasUsuarioService(this.notaRepositorio);
                }

    @Post('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarNotas.execute('Buscar todas las notas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarNotaIdDto){
        let result = await this.buscarNotaId.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByFolder')
    async findByFolder(@Res() response, @Body() body: BuscarNotasCarpetaDto){
        let result = await this.buscarNotasCarpeta.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findDeleted')
    async findDeleted(@Res() response, @Body() body: BuscarNotasEliminadasUsuarioDto){
        let result = await this.buscarEliminadas.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarNotasUsuarioDto){
        let result = await this.buscarNotasUsuario.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
    
    @Put('/modificate')
    async update(@Res() response, @Body() body: ModificarNotaDto){
        

        if(!body.etiquetas)
            body.etiquetas=[]
        
            let etiq = body.etiquetas.map(ima => {
                return ima;
            })   
            
            console.log("controller etiq",etiq)

        const result = await this.modificarNota.execute(body);

        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/create')
 async create(@Res() response, @Body() body: CrearNotaDto){


        if(!body.etiquetas)
            body.etiquetas=[]

            // let etiq = body.etiquetas.map(ima => {
            //     return ima;
            // }) 
            // body.etiquetas=etiq;

            //console.log("controller etiq",etiq)

        console.log(body);
    
  const result = await this.crearNotaService.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
}   

    @Delete('/delete')
    async delete (@Res() response, @Body() body: BorraNotaDto){
        const result = await this.eliminarNota.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }

    }

}