import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm"

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

    @Column()
    latitud: number
    
    @Column()
    longitud: number
    
    @Column()
    estado: string

    @ManyToOne(() => CarpetaEntity)
    @JoinColumn({ name: 'carpeta' })
    carpeta: string;

}