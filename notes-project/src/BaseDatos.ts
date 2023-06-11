import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: "localhost",
    port: 5432,
    database: "NoteApp",
    username:"postgres",
    password:"Cesar24Diana14",
    autoLoadEntities: true,
    synchronize: true,
    logging: true
    
}