import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../BaseDatos';
import { NotaModule } from "src/modulos/nota.module";
import { CarpetaModule } from './carpeta.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    NotaModule,
    CarpetaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}