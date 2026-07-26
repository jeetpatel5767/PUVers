"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { ORGANIZER_NAV } from "@/constants/navigation";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={ORGANIZER_NAV} roleLabel="Organizer Portal">
      {children}
    </DashboardShell>
  );
}
