import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrearNotaService } from 'src/nota/aplicacion/CrearNotaService';
import { NotaEntity } from 'src/nota/infraestructura/Entity/NotaEntity';
import { NotaController } from 'src/nota/infraestructura/NotaController/NotaController';
import { NotaRepositorioAdaptador } from 'src/nota/infraestructura/Repositorio/NotaRepositorioAdaptador';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotaEntity])],
  providers: [CrearNotaService,NotaRepositorioAdaptador],
  controllers: [NotaController]
})
export class NotaModule {}