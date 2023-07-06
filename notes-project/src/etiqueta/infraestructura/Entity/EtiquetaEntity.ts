import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm"

@Entity()
export class EtiquetaEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @ManyToMany(() => NotaEntity, (nota) => nota.etiqueta,{nullable:true})
    // @JoinTable({
    //     name: 'nota_etiqueta', // Nombre de la tabla de unión
    //     joinColumn: { name: 'etiqueta_id', referencedColumnName: 'id' }, // Columna de clave foránea para la tabla de origen
    //     inverseJoinColumn: { name: 'nota_id', referencedColumnName: 'id' }, // Columna de clave foránea para la tabla de destino
    //   })
    @JoinTable()
    nota: NotaEntity[];

    @ManyToOne(() => UsuarioEntity,(usuario) => usuario.etiqueta, { onDelete: 'CASCADE', nullable: true, onUpdate:'CASCADE' }	)
    usuario: UsuarioEntity;

}