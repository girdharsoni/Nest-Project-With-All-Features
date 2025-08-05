import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity'; // Adjust the import path as necessary

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'module', type: 'text', unique: true })
  module: string;

  @Column({ type: 'jsonb' })
  routes: Record<string, string[]>; // e.g. { GET: ["/", "/:id"], POST: ["/"] }

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions: RolePermission[];
}
