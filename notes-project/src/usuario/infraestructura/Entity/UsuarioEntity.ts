import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity"
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"

@Entity()
export class UsuarioEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @Column({unique:true})
    correo: string

    @Column()
    clave: string

    @Column()
    fechaNacimiento: Date

    @OneToMany(() => CarpetaEntity, (carpeta) => carpeta.usuario,{cascade:['remove'],eager:true,nullable:true})
    carpeta: CarpetaEntity[];

}