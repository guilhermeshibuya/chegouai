import { BaseEntity } from 'src/common/entities/base-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PackageStatus } from '../enums/package.enum';
import { Pickup } from 'src/modules/pickups/entities/pickup.entity';
import { Resident } from 'src/modules/residents/entities/resident.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Condominium } from 'src/modules/condominiums/entities/condominium.entity';

@Entity('packages')
export class Package extends BaseEntity {
  @Column({ nullable: true })
  imageUrL?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: PackageStatus, default: PackageStatus.PENDING })
  status: PackageStatus;

  @Column({ type: 'timestamptz', nullable: false })
  receiptDate: Date;

  @Column({ nullable: true })
  carrier?: string;

  @Column({ nullable: true })
  locationHint?: string;

  @Column({ nullable: true })
  trackingCode?: string;

  @OneToOne(() => Pickup, (pickup) => pickup.package)
  pickup: Pickup;

  @ManyToOne(() => Resident, (resident) => resident.packages)
  @JoinColumn({ name: 'residentId' })
  resident: Resident;

  @ManyToOne(() => Staff, (staff) => staff.packages)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @ManyToOne(() => Condominium, (condominium) => condominium.packages)
  @JoinColumn({ name: 'condominiumId' })
  condominium: Condominium;
}
