"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { STUDENT_NAV } from "@/constants/navigation";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={STUDENT_NAV} roleLabel="Student Portal">
      {children}
    </DashboardShell>
  );
}
