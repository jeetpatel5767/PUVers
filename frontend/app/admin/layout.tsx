"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { ADMIN_NAV } from "@/constants/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={ADMIN_NAV} roleLabel="Admin Portal">
      {children}
    </DashboardShell>
  );
}
