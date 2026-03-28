import { BaseEntity } from 'src/common/entities/base-entity.entity';
import { AuditLog } from 'src/modules/audit/entities/audit-log.entity';
import { Package } from 'src/modules/packages/entities/package.entity';
import { Resident } from 'src/modules/residents/entities/resident.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('condominiums')
export class Condominium extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @OneToMany(() => Staff, (staff) => staff.condominium)
  staff: Staff[];

  @OneToMany(() => Resident, (resident) => resident.condominium)
  residents: Resident[];

  @OneToOne(() => AuditLog, (auditLog) => auditLog.condominium)
  auditLog: AuditLog;

  @OneToMany(() => Package, (pkg) => pkg.condominium)
  packages: Package[];
}
