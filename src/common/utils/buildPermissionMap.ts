import { RolePermission } from '../types/permissions.type';

/**
 * Builds a Map where each key is `${METHOD}:${ROUTE}` and value is true (allowed) or false (denied)
 */
export function buildPermissionMap(
  rolePermissions: RolePermission[],
): Map<string, boolean> {
  const map = new Map<string, boolean>();

  for (const rp of rolePermissions) {
    const allRoutes = rp.permission.routes;
    const restricted = rp.restricted_routes || {};

    for (const method in allRoutes) {
      const allowedRoutes = allRoutes[method] || [];
      const denied = restricted[method] || [];

      for (const route of allowedRoutes) {
        const key = `${method}:${route}`;
        // If the route is in denied, set
        map.set(key, !denied.includes(route));
      }
    }
  }

  return map;
}
