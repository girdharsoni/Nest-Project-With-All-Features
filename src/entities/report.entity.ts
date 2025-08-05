import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { RecordStatus } from '../common/constants/constants'; // Adjust the import path as necessary

@Entity('reports') // Specify the table name explicitly
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.reports, {
    eager: true, // optional: auto-loads user
    onDelete: 'CASCADE', // optional: deletes reports if user is deleted
  })
  @JoinColumn({ name: 'user_id' }) // 👈 explicitly creates "user_id" FK column
  user: User;

  @Column()
  user_id: string; // 👈 helpful for direct access without relation loading

  @Index() // Index for faster lookups
  @Column({
    type: 'enum',
    enum: RecordStatus,
    default: RecordStatus.ACTIVE,
  })
  status: RecordStatus;
}
