"use client";

import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { PLATFORM_ADMIN_NAV } from "@/constants/navigation";

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={PLATFORM_ADMIN_NAV} roleLabel="Platform Admin Portal">
      {children}
    </DashboardShell>
  );
}
