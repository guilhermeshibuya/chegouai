import { BaseEntity } from 'src/common/entities/base-entity.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ResidentStatus } from '../enums/resident.enum';
import { Condominium } from 'src/modules/condominiums/entities/condominium.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Package } from 'src/modules/packages/entities/package.entity';

@Entity('residents')
@Index(['cpf', 'condominium'], { unique: true })
export class Resident extends BaseEntity {
  @Column()
  name?: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  phone: string;

  @Column()
  apartment: string;

  @Column({ nullable: true })
  block?: string;

  @Column({
    type: 'enum',
    enum: ResidentStatus,
    default: ResidentStatus.INACTIVE,
  })
  status: ResidentStatus;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => Condominium, (condominium) => condominium.residents)
  @JoinColumn({ name: 'condominiumId' })
  condominium: Condominium;

  @OneToMany(() => Package, (pkg) => pkg.resident)
  packages: Package[];
}
