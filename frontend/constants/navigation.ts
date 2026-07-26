import type { NavItem, UserRole } from "@/types";

export const ROLE_HOME: Record<UserRole, string> = {
  student: "/student",
  organizer: "/organizer",
  admin: "/admin",
  super_admin: "/super-admin",
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

export const ORGANIZER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/organizer" },
  { label: "My Events", href: "/organizer/events" },
  { label: "Create Event", href: "/organizer/events/create" },
  { label: "Analytics", href: "/organizer/analytics" },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Organizations", href: "/admin/organizations" },
  { label: "Event Approvals", href: "/admin/events" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Notifications", href: "/admin/notifications" },
  { label: "Settings", href: "/admin/settings" },
];

export const SUPER_ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/super-admin" },
  { label: "Roles & Permissions", href: "/super-admin/roles" },
  { label: "Users", href: "/super-admin/users" },
  { label: "Organizations", href: "/super-admin/organizations" },
  { label: "All Events", href: "/super-admin/events" },
  { label: "Analytics", href: "/super-admin/analytics" },
  { label: "System Settings", href: "/super-admin/settings" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student",
  organizer: "Organizer",
  admin: "Admin",
  super_admin: "Super Admin",
};
