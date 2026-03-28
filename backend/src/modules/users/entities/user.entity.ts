import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserStatus } from '../enums/user.enum';
import { BaseEntity } from 'src/common/entities/base-entity.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Resident } from 'src/modules/residents/entities/resident.entity';
import { AuditLog } from 'src/modules/audit/entities/audit-log.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isSysAdmin: boolean;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @OneToMany(() => Staff, (staff) => staff.user)
  staff: Staff[];

  @OneToOne(() => Resident, (resident) => resident.user)
  resident: Resident;

  @OneToMany(() => AuditLog, (auditLog) => auditLog.user)
  auditLogs: AuditLog[];
}
