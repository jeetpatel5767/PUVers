export type UserRole = "student" | "admin" | "super_admin" | "platform_admin";

export type EventStatus =
  | "draft"
  | "pending_approval"
  | "published"
  | "completed"
  | "cancelled";

export type RegistrationStatus = "registered" | "waitlisted" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  department?: string;
  year?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  members: number;
  events: number;
  status: "active" | "inactive";
}

export interface EventTimelineItem {
  day: string;
  time: string;
  title: string;
  description: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  org: string;
}

export interface EventOrganizer {
  name: string;
  role: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organization: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
  registered: number;
  status: EventStatus;
  category: string;
  organizer: string;
  requiresApproval: boolean;
  thumbnail?: string;
  aboutEvent?: string;
  teamSize?: string;
  timeline?: EventTimelineItem[];
  speakers?: EventSpeaker[];
  galleryCount?: number;
  hasCertificate?: boolean;
  organizers?: EventOrganizer[];
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  studentName: string;
  studentEmail: string;
  status: RegistrationStatus;
  registeredAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  ticketCode: string;
  issuedAt: string;
  status: "active" | "used" | "expired";
}

export interface Certificate {
  id: string;
  eventId: string;
  eventTitle: string;
  issuedAt: string;
  downloadUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "info" | "success" | "warning";
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  checkedInAt: string;
  method: "qr" | "manual";
}

export interface RolePermission {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
