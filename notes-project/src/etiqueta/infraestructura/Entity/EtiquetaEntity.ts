import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { Column, Entity, ManyToOne, PrimaryColumn} from "typeorm"

@Entity()
export class EtiquetaEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

}