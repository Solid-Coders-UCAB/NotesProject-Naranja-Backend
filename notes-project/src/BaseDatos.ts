import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {

            type: 'postgres',
            host: "localhost",
            port: 5432,
            database: "NoteProject",
            username:"postgres",
            password:"omar25",
            synchronize: true,
            logging: true
       

}