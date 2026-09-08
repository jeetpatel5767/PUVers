"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ALL_USERS,
  CERTIFICATES,
  EVENTS,
  NOTIFICATIONS,
  REGISTRATIONS,
  TICKETS,
  DEMO_USERS,
} from "@/constants/mock-data";
import type {
  Certificate,
  Event,
  NotificationItem,
  Registration,
  Ticket,
  User,
  UserRole,
} from "@/types";

interface DemoState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  events: Event[];
  registrations: Registration[];
  tickets: Ticket[];
  certificates: Certificate[];
  notifications: NotificationItem[];
  login: (role: UserRole) => void;
  logout: () => void;
  registerForEvent: (eventId: string, answers?: Record<string, any>) => void;
  cancelRegistration: (registrationId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  createEvent: (eventData: Partial<Event>, isDraft?: boolean) => void;
  updateEvent: (eventId: string, eventData: Partial<Event>) => void;
  approveEvent: (eventId: string) => void;
  publishEvent: (eventId: string) => void;
  requestChanges: (eventId: string, remarks: string) => void;
  rejectEvent: (eventId: string, remarks?: string) => void;
  resubmitEvent: (eventId: string) => void;
  assignEventAdmin: (userId: string, remark?: string) => void;
  removeEventAdmin: (userId: string) => void;
  addToastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      user: DEMO_USERS.participant,
      isAuthenticated: true,
      users: ALL_USERS,
      events: EVENTS,
      registrations: REGISTRATIONS,
      tickets: TICKETS,
      certificates: CERTIFICATES,
      notifications: NOTIFICATIONS,
      addToastMessage: null,

      login: (role) => {
        const userObj = DEMO_USERS[role] || DEMO_USERS.participant;
        set({
          user: userObj,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      registerForEvent: (eventId, answers) => {
        const event = get().events.find((e) => e.id === eventId);
        if (!event) return;

        const alreadyRegistered = get().registrations.some(
          (r) => r.eventId === eventId && r.status !== "cancelled",
        );
        if (alreadyRegistered) {
          set({ addToastMessage: "Already registered for this event" });
          return;
        }

        const isFull = event.registered >= event.capacity;
        const newReg: Registration = {
          id: `reg-${Date.now()}`,
          eventId,
          eventTitle: event.title,
          userId: get().user?.id ?? "u1",
          studentName: get().user?.name ?? "Participant",
          studentEmail: get().user?.email ?? "participant@pu.ac.in",
          status: isFull ? "waitlisted" : "registered",
          registeredAt: new Date().toISOString(),
          submittedAt: new Date().toISOString(),
          formVersion: 1,
          answers: answers || {},
        };

        const updates: Partial<DemoState> = {
          registrations: [...get().registrations, newReg],
          events: get().events.map((e) =>
            e.id === eventId ? { ...e, registered: e.registered + 1 } : e,
          ),
          addToastMessage: isFull
            ? "Added to waitlist — event capacity reached"
            : "Registration confirmed! QR check-in ticket issued.",
        };

        if (!isFull) {
          const newTicket: Ticket = {
            id: `tkt-${Date.now()}`,
            eventId,
            eventTitle: event.title,
            ticketCode: `PUV-${eventId.slice(-4).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
            issuedAt: new Date().toISOString(),
            status: "active",
          };
          updates.tickets = [...get().tickets, newTicket];
        }

        set(updates);
      },

      cancelRegistration: (registrationId) => {
        set({
          registrations: get().registrations.map((r) =>
            r.id === registrationId ? { ...r, status: "cancelled" as const } : r,
          ),
          addToastMessage: "Registration cancelled",
        });
      },

      markNotificationRead: (id) => {
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        });
      },

      markAllNotificationsRead: () => {
        set({
          notifications: get().notifications.map((n) => ({ ...n, read: true })),
        });
      },

      createEvent: (eventData, isDraft = false) => {
        const newEvent: Event = {
          id: `evt-${Date.now()}`,
          title: eventData.title || "Untitled Event",
          description: eventData.description || "",
          about: eventData.about || eventData.description || "",
          eventCategory: eventData.eventCategory || "Conference",
          category: eventData.eventCategory || "Conference",
          startDate: eventData.startDate || new Date().toISOString().split("T")[0],
          endDate: eventData.endDate || new Date().toISOString().split("T")[0],
          startTime: eventData.startTime || "09:00 AM",
          endTime: eventData.endTime || "05:00 PM",
          venue: eventData.venue || "Campus Auditorium",
          bannerUrl: eventData.bannerUrl || null,
          eventMode: eventData.eventMode || "Offline",
          createdBy: get().user?.id || "u2",
          organizerId: get().user?.id || "u2",
          organizer: get().user?.name || "Priya Mehta",
          organization: get().user?.organization || "Tech Fest Committee",
          capacity: Number(eventData.capacity) || 100,
          registered: 0,
          status: isDraft ? "DRAFT" : "PENDING_APPROVAL",
          submittedAt: new Date().toISOString(),
          agenda: eventData.agenda || [],
          speakers: eventData.speakers || [],
          sponsors: eventData.sponsors || [],
          registrationFields: eventData.registrationFields || [],
          hasCertificate: true,
          requiresApproval: true,
        };
        set({
          events: [newEvent, ...get().events],
          addToastMessage: isDraft
            ? "Draft saved successfully."
            : "Event submitted for Super Admin approval.",
        });
      },

      updateEvent: (eventId, eventData) => {
        set({
          events: get().events.map((e) =>
            e.id === eventId ? { ...e, ...eventData } : e,
          ),
          addToastMessage: "Event updated successfully.",
        });
      },

      approveEvent: (eventId) => {
        set({
          events: get().events.map((e) =>
            e.id === eventId ? { ...e, status: "APPROVED" as const } : e,
          ),
          addToastMessage: "Event approved. Event Admin can now publish it.",
        });
      },

      publishEvent: (eventId) => {
        set({
          events: get().events.map((e) =>
            e.id === eventId
              ? { ...e, status: "PUBLISHED" as const, publishedAt: new Date().toISOString() }
              : e,
          ),
          addToastMessage: "Event published to public feed!",
        });
      },

      requestChanges: (eventId, remarks) => {
        set({
          events: get().events.map((e) =>
            e.id === eventId
              ? { ...e, status: "CHANGES_REQUESTED" as const, superAdminRemarks: remarks }
              : e,
          ),
          addToastMessage: "Changes requested sent to Event Admin.",
        });
      },

      rejectEvent: (eventId, remarks) => {
        set({
          events: get().events.map((e) =>
            e.id === eventId
              ? { ...e, status: "REJECTED" as const, superAdminRemarks: remarks || "Event does not meet university guidelines." }
              : e,
          ),
          addToastMessage: "Event rejected.",
        });
      },

      resubmitEvent: (eventId) => {
        set({
          events: get().events.map((e) =>
            e.id === eventId
              ? { ...e, status: "PENDING_APPROVAL" as const, submittedAt: new Date().toISOString() }
              : e,
          ),
          addToastMessage: "Event resubmitted for Super Admin approval.",
        });
      },

      assignEventAdmin: (userId, remark) => {
        set({
          users: get().users.map((u) =>
            u.id === userId ? { ...u, role: "event_admin" as const } : u,
          ),
          addToastMessage: "Assigned EVENT_ADMIN role successfully.",
        });
      },

      removeEventAdmin: (userId) => {
        set({
          users: get().users.map((u) =>
            u.id === userId ? { ...u, role: "participant" as const } : u,
          ),
          addToastMessage: "EVENT_ADMIN role removed. User is now Participant.",
        });
      },

      setToastMessage: (msg) => set({ addToastMessage: msg }),
    }),
    {
      name: "puverse-demo",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        users: state.users,
        events: state.events,
        registrations: state.registrations,
        tickets: state.tickets,
        notifications: state.notifications,
      }),
    },
  ),
);
