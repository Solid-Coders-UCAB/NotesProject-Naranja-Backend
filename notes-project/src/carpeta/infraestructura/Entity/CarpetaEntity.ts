import { Column, Entity, PrimaryColumn} from "typeorm"

@Entity()
export class CarpetaEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

}