import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Report } from './report.entity'; // Adjust the import path as necessary
import { RecordStatus } from '../common/constants/constants'; // Adjust the import path as necessary
import { Role } from './role.entity'; // Adjust the import path as necessary

@Entity('users') // Specify the table name explicitly
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true }) // Ensure email is unique
  email: string;

  @Column()
  password: string;

  @Column('text', { nullable: true }) // Can handle long tokens
  access_token: string;

  @Column('text', { nullable: true })
  refresh_token: string;

  @Index() // Index for faster lookups
  @Column({
    type: 'enum',
    enum: RecordStatus,
    default: RecordStatus.ACTIVE,
  })
  status: RecordStatus;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ type: 'uuid', nullable: true })
  role_id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // Only Executed When Value Saved, Updated, Remove as Entity Type
  @AfterInsert()
  logInsert() {
    console.log('[Info] Inserted Id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('[Info] Updated User: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('[Info] Remove User: ', this.id);
  }
}
