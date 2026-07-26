"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { SUPER_ADMIN_NAV } from "@/constants/navigation";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={SUPER_ADMIN_NAV} roleLabel="Super Admin Portal">
      {children}
    </DashboardShell>
  );
}
