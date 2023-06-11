import { TypeOrmModule } from "@nestjs/typeorm";
import { NotaEntity } from "./Entity/NotaEntity";
import { NotaController } from "./NotaController/NotaController";
import { NotaRepositorioAdaptador } from "./Repositorio/NotaRepositorioAdaptador";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([NotaEntity])],
    controllers: [NotaController],
    providers: [NotaRepositorioAdaptador]
  })
  export class NotaModule {}