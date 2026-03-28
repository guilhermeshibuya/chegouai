import { Package } from 'src/modules/packages/entities/package.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('pickups')
export class Pickup {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column({ type: 'timestamptz' })
  pickupDate: Date;

  @Column({ nullable: true })
  signatureUrl?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  recepientName?: string;

  @OneToOne(() => Package, (pkg) => pkg.id)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @ManyToOne(() => Staff, (staff) => staff.id)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;
}
