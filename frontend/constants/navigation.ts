import type { NavItem, UserRole } from "@/types";

export const ROLE_HOME: Record<UserRole, string> = {
  participant: "/student",
  event_admin: "/admin",
  student: "/student",
  admin: "/admin",
  super_admin: "/super-admin",
  platform_admin: "/platform-admin",
};

export const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/student" },
  { label: "Browse Events", href: "/student/events" },
  { label: "My Registrations", href: "/student/registrations" },
  { label: "My Tickets", href: "/student/tickets" },
  { label: "Certificates", href: "/student/certificates" },
  { label: "Notifications", href: "/student/notifications" },
  { label: "Profile", href: "/student/profile" },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "My Events", href: "/admin/events" },
  { label: "Create Event", href: "/admin/events/create" },
  { label: "Analytics", href: "/admin/analytics" },
];

export const SUPER_ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/super-admin" },
  { label: "Users", href: "/super-admin/users" },
  { label: "Organizations", href: "/super-admin/organizations" },
  { label: "Event Approvals", href: "/super-admin/events" },
  { label: "Analytics", href: "/super-admin/analytics" },
  { label: "Notifications", href: "/super-admin/notifications" },
  { label: "Settings", href: "/super-admin/settings" },
];

export const PLATFORM_ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/platform-admin" },
  { label: "Roles & Permissions", href: "/platform-admin/roles" },
  { label: "Users", href: "/platform-admin/users" },
  { label: "Organizations", href: "/platform-admin/organizations" },
  { label: "All Events", href: "/platform-admin/events" },
  { label: "Analytics", href: "/platform-admin/analytics" },
  { label: "System Settings", href: "/platform-admin/settings" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  participant: "Participant",
  event_admin: "Event Admin",
  student: "Participant",
  admin: "Event Admin",
  super_admin: "Super Admin",
  platform_admin: "Platform Admin",
};
