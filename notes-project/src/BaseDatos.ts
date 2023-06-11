import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeOrmModuleAsyncConfig: TypeOrmModuleAsyncOptions = {


    useFactory: async () :Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: process.env.DB_host,
            port: parseInt(process.env.DB_port,10),
            database: process.env.DB_database,
            username:"postgres",
            password:"omar25",
            entities: ["src/nota/infraestructura/Entity/*.ts"],
            synchronize: true,
            logging: true
        }
    }

}