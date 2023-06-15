import { Column, Entity, PrimaryColumn} from "typeorm"

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
}