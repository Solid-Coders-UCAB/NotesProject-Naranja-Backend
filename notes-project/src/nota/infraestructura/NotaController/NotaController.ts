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

@Controller('nota')
export class NotaController {

    constructor(private readonly crearNotaService: CrearNotaService,
        private readonly modificarNota: ModificarNotaService,
        private readonly eliminarNota: EliminarNotaService,
        private readonly buscarNotas: BuscarNotasService,
        private readonly buscarNotaId: BuscarNotaPorIdService) {}

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
    
    @Put('/modificate')
    @UseInterceptors(FilesInterceptor('imagen'))
    async update(@UploadedFiles() file: Express.Multer.File[],@Res() response, @Body() body: ModificarNotaDto){
        
    const imagenes = file.map((imagen) => {
            return {buffer : imagen.buffer}
        })  

        body.imagen = imagenes;

        const result = await this.modificarNota.execute(body);

        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/create')
    @UseInterceptors(FilesInterceptor('imagen'))
 async create(@UploadedFiles() file: Express.Multer.File[],@Res() response, @Body() body: CrearNotaDto){


        const imagenes = file.map((imagen) => {
            return {buffer : imagen.buffer}
        })  

        body.imagen = imagenes;
    
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