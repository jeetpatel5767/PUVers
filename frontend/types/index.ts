export type UserRole =
  | "participant"
  | "event_admin"
  | "super_admin"
  | "student" // alias for participant
  | "admin"   // alias for event_admin
  | "platform_admin";

export type EventStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED"
  | "COMPLETED"
  // lowercase aliases for backward compatibility
  | "draft"
  | "pending_approval"
  | "published"
  | "completed"
  | "cancelled";

export type RegistrationStatus = "registered" | "waitlisted" | "cancelled";

export interface User {
  id: string;
  universityId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  course?: string;
  year?: string;
  organization?: string;
  status?: "active" | "inactive";
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  members: number;
  events: number;
  status: "active" | "inactive";
}

export interface AgendaItem {
  id?: string;
  time: string;
  sessionTitle: string;
  description?: string | null;
  displayOrder: number;
}

export interface SpeakerItem {
  id?: string;
  name: string;
  designation?: string | null;
  organization?: string | null;
  role?: string;
  org?: string;
  bio?: string | null;
  photoUrl?: string | null;
  linkedinUrl?: string | null;
  displayOrder?: number;
}

export interface SponsorItem {
  id?: string;
  name: string;
  logoUrl?: string | null;
  description?: string | null;
  websiteUrl?: string | null;
  sponsorshipLevel?: string | null;
  displayOrder?: number;
}

export interface RegistrationFormField {
  id: string;
  name?: string;
  label: string;
  fieldType?: "text" | "email" | "number" | "select" | "file" | "textarea";
  type?: string;
  required: boolean;
  isSystem: boolean;
  options?: string[];
  displayOrder?: number;
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
  about?: string;
  eventCategory: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  venue: string;
  bannerUrl?: string | null;
  eventMode: "Online" | "Offline";
  createdBy?: string;
  organizerId?: string;
  organizer: string;
  organization: string;
  capacity: number;
  registered: number;
  status: EventStatus;
  superAdminRemarks?: string | null;
  submittedAt?: string;
  publishedAt?: string | null;
  agenda?: AgendaItem[];
  speakers?: SpeakerItem[];
  sponsors?: SponsorItem[];
  registrationFields?: RegistrationFormField[];

  // Legacy/UI display helpers
  category?: string;
  aboutEvent?: string;
  thumbnail?: string;
  teamSize?: string;
  timeline?: EventTimelineItem[];
  galleryCount?: number;
  hasCertificate?: boolean;
  requiresApproval?: boolean;
  organizers?: EventOrganizer[];
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  userId?: string;
  studentName: string;
  studentEmail: string;
  formVersion?: number;
  status: RegistrationStatus;
  registeredAt: string;
  submittedAt?: string;
  answers?: Record<string, any>;
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
