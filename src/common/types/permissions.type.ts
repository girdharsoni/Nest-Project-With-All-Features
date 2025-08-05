// src/permissions/types/permission.types.ts

export interface Permission {
  module: string;
  routes: {
    [method: string]: string[];
  };
}

export interface RolePermission {
  permission: Permission;
  restricted_routes?: {
    [method: string]: string[];
  };
}
