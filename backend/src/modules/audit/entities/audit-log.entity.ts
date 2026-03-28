import { Condominium } from 'src/modules/condominiums/entities/condominium.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column()
  action: string;

  @Column()
  tableName: string;

  @Column()
  recordId: string;

  @Column({ type: 'jsonb' })
  oldValues: string;

  @Column({ type: 'jsonb' })
  newValues: string;

  @Column()
  ipAddress: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Condominium, (condominium) => condominium.auditLog)
  @JoinColumn({ name: 'condominiumId' })
  condominium?: Condominium;
}
