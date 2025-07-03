import type { UserRole } from "@/contexts/auth-context"

export const roleHierarchy: Record<UserRole, number> = {
  user: 1,
  mess_owner: 2,
  project_admin: 3,
}

export const rolePermissions = {
  user: ["view_menu", "place_order", "view_orders", "update_profile"],
  mess_owner: [
    "view_menu",
    "place_order",
    "view_orders",
    "update_profile",
    "manage_menu",
    "view_analytics",
    "manage_orders",
    "view_customers",
  ],
  project_admin: [
    "view_menu",
    "place_order",
    "view_orders",
    "update_profile",
    "manage_menu",
    "view_analytics",
    "manage_orders",
    "view_customers",
    "manage_users",
    "create_admins",
    "system_settings",
    "view_all_data",
  ],
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
  return rolePermissions[userRole].includes(permission)
}

export function canAccessRole(userRole: UserRole, targetRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[targetRole]
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames = {
    user: "Food Lover",
    mess_owner: "Mess Owner",
    project_admin: "Project Admin",
  }
  return roleNames[role]
}

export function getRoleColor(role: UserRole): string {
  const roleColors = {
    user: "bg-blue-100 text-blue-800",
    mess_owner: "bg-green-100 text-green-800",
    project_admin: "bg-purple-100 text-purple-800",
  }
  return roleColors[role]
}
