import { Inject, Injectable } from "@nestjs/common";
import { UsuarioRepositorio } from "src/usuario/dominio/UsuarioRepositorio";
import { Repository } from "typeorm";
import { UsuarioEntity } from "../Entity/UsuarioEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/dominio/Usuario";
import { Either } from "src/utilidad/Either";
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";

@Injectable()
export class UsuarioRepositorioAdaptador implements UsuarioRepositorio{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly repositorio: Repository<UsuarioEntity>,
        @InjectRepository(CarpetaEntity)
        private readonly repositorioCarpeta: Repository<CarpetaEntity>
    ){}

    async registrarUsuario(usuario: Usuario): Promise<Either<Error, Usuario>> {

        const usuarioEnt : UsuarioEntity = {
            id: usuario.getId(),
            nombre: usuario.getNombre(),
            correo: usuario.getCorreo(),
            clave: usuario.getClave(),
            fechaNacimiento: usuario.getFechaNacimiento(),
            carpeta: []
        };

        const result = await this.repositorio.save(usuarioEnt);

        if(result){
            return Either.makeRight<Error,Usuario>(usuario);

        }
        else{
            return Either.makeLeft<Error,Usuario>(new Error('Error de la base de datos'));
        }

    }

    async buscarUsuarios(): Promise<Either<Error, Iterable<Usuario>>> {
        const result: UsuarioEntity[] = await this.repositorio.find();
        if(result.length!=0){
            const usuarios: Usuario[] = result.map((usuario) =>
                Usuario.create(usuario.nombre, usuario.correo,usuario.clave,usuario.fechaNacimiento,usuario.id).getRight());
            return Either.makeRight<Error,Usuario[]>(usuarios);
        }
        else{
            return Either.makeLeft<Error,Usuario[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarUsuarioPorId(id: string): Promise<Either<Error, Usuario>> {
        const result: UsuarioEntity = await this.repositorio.findOneBy({id:id});
        if(result){
            const usuario: Usuario = Usuario.create(result.nombre, result.correo,result.clave,result.fechaNacimiento,result.id).getRight();
            return Either.makeRight<Error,Usuario>(usuario);
        }
        else{
            return Either.makeLeft<Error,Usuario>(new Error('Error de la base de datos'));
        }
    }

    async buscarUsuarioPorCorreoClave(correo: string, clave: string): Promise<Either<Error, Usuario>> {
        const result: UsuarioEntity = await this.repositorio.findOneBy({correo:correo,clave:clave});
        if(result){
            const usuario: Usuario = Usuario.create(result.nombre, result.correo,result.clave,result.fechaNacimiento,result.id).getRight();
            return Either.makeRight<Error,Usuario>(usuario);
        }
        else{
            return Either.makeLeft<Error,Usuario>(new Error('No se encontro el usuario'));
        }
    }

    async modificarUsuario(usuario: Usuario): Promise<Either<Error, Usuario>> {

        const carpetas = await this.repositorioCarpeta.find({where: {usuario: {id: usuario.getId()}}});

            const usuarioEnt : UsuarioEntity = {
                id: usuario.getId(),
                nombre: usuario.getNombre(),
                correo: usuario.getCorreo(),
                clave: usuario.getClave(),
                fechaNacimiento: usuario.getFechaNacimiento(),
                carpeta: carpetas
            };
    
            const result = await this.repositorio.save(usuarioEnt);
    
            if(result){
                return Either.makeRight<Error,Usuario>(usuario);
    
            }
            else{
                return Either.makeLeft<Error,Usuario>(new Error('Error de la base de datos'));
            }
    
    }

}