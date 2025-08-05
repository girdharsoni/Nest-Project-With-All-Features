import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { RecordStatus } from '../common/constants/constants'; // Adjust the import path as necessary

@Entity('login_otp') // Specify the table name explicitly
export class LoginOtp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index() // Index for faster lookups
  @Column()
  email: string;

  @Column()
  otp: string;

  @Column({
    type: 'timestamptz',
    default: () => `CURRENT_TIMESTAMP`,
  })
  expiration: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Index() // Index for faster lookups
  @Column({
    type: 'enum',
    enum: RecordStatus,
    default: RecordStatus.ACTIVE,
  })
  status: RecordStatus;
}
