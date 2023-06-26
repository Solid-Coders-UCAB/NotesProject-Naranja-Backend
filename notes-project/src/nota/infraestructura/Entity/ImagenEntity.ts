import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { NotaEntity } from "./NotaEntity";

@Entity()
export class ImagenEntity {

    @PrimaryGeneratedColumn()
    idi: number

    @Column({ type: 'bytea', nullable: true })
    imagen: Buffer

    @ManyToOne(() => NotaEntity,(nota) => nota.imagen, { onDelete: 'CASCADE', nullable: true, onUpdate:'CASCADE' }	)
    nota: NotaEntity;

}