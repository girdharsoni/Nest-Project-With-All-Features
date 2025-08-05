import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity'; // Adjust the import path as necessary
import { Permission } from './permission.entity'; // Adjust the import path as necessary

@Entity('role_permissions')
export class RolePermission {
  @PrimaryColumn('uuid')
  role_id: string;

  @PrimaryColumn('uuid')
  permission_id: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @Column({ type: 'jsonb', default: () => `'{}'` })
  restricted_routes: Record<string, string[]>; // e.g. { GET: ["/:id"] }
}
