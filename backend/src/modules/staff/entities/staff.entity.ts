import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';
import { StaffRole } from '../enums/staff.enum';
import { Condominium } from 'src/modules/condominiums/entities/condominium.entity';
import { Pickup } from 'src/modules/pickups/entities/pickup.entity';
import { Package } from 'src/modules/packages/entities/package.entity';

@Entity('staff')
@Index(['cpf', 'condominium'], { unique: true })
export class Staff {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @ManyToOne(() => User, (user) => user.staff)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Condominium, (condominium) => condominium.staff)
  @JoinColumn({ name: 'condominiumId' })
  condominium: Condominium;

  @Column({ type: 'enum', enum: StaffRole })
  role: StaffRole;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  phone: string;

  @OneToMany(() => Pickup, (pickup) => pickup.staff)
  pickups: Pickup[];

  @OneToMany(() => Package, (pkg) => pkg.staff)
  packages: Package[];
}
