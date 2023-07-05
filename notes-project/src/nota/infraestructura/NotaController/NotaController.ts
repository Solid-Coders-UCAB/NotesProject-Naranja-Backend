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
import { FilesInterceptor } from "@nestjs/platform-express";
import { BuscarNotasCarpetaDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasCarpetaDto";
import { BuscarNotasCarpetaService } from "src/nota/aplicacion/BuscarNotasCarpetaService";

@Controller('nota')
export class NotaController {

    constructor(private readonly crearNotaService: CrearNotaService,
        private readonly modificarNota: ModificarNotaService,
        private readonly eliminarNota: EliminarNotaService,
        private readonly buscarNotas: BuscarNotasService,
        private readonly buscarNotaId: BuscarNotaPorIdService,
        private readonly buscarNotasCarpeta: BuscarNotasCarpetaService) {}

    @Get('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarNotas.execute('Buscar todas las notas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findById')
    async findById(@Res() response, @Body() body: BuscarNotaIdDto){
        let result = await this.buscarNotaId.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findByFolder')
    async findByFolder(@Res() response, @Body() body: BuscarNotasCarpetaDto){
        let result = await this.buscarNotasCarpeta.execute(body);
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