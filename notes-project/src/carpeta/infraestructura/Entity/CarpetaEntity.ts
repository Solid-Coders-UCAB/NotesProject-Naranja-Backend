import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity"
import { Column, Entity, OneToMany, PrimaryColumn} from "typeorm"

@Entity()
export class CarpetaEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @OneToMany(() => NotaEntity, (nota) => nota.carpeta,{cascade:['remove'],eager:true,nullable:true})
    nota: NotaEntity[];

}