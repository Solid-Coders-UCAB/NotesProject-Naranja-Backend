import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm"
import { ImagenEntity } from "./ImagenEntity"

@Entity()
export class NotaEntity {

    @PrimaryColumn()
    id: string

    @Column()
    titulo: string

    @Column()
    cuerpo: string

    @Column()
    fechaCreacion: Date

    @Column()
    fechaModificacion: Date

    @Column({nullable:true})
    latitud?: number
    
    @Column({nullable:true})
    longitud?: number
    
    @Column()
    estado: string

    @OneToMany(() => ImagenEntity, (imagen) => imagen.nota,{cascade:['remove'],eager:true,nullable:true})
    imagen: ImagenEntity[];

    @ManyToOne(() => CarpetaEntity,(carpeta) => carpeta.nota, { onDelete: 'CASCADE', nullable: true, onUpdate:'CASCADE' }	)
    carpeta: CarpetaEntity;

}