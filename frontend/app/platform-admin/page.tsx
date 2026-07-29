"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { useDemoStore } from "@/store/demo-store";
import { ANALYTICS, ALL_USERS, ORGANIZATIONS } from "@/constants/mock-data";

export default function PlatformAdminDashboard() {
  const events = useDemoStore((s) => s.events);
  const pending = events.filter((e) => e.status === "pending_approval");
  const admins = ALL_USERS.filter((u) => u.role === "admin");
  const activeOrgs = ORGANIZATIONS.filter((o) => o.status === "active");

  return (
    <div>
      <PageHeader
        title="Platform Admin Dashboard"
        description="Complete platform oversight and control."
        action={
          <Link href="/platform-admin/events">
            <Button>Review Pending ({pending.length})</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={ANALYTICS.totalUsers} />
        <StatCard label="Total Events" value={ANALYTICS.totalEvents} />
        <StatCard label="Active Orgs" value={activeOrgs.length} />
        <StatCard label="Pending Approvals" value={pending.length} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Registrations" value={ANALYTICS.totalRegistrations.toLocaleString()} />
        <StatCard label="Attendance Rate" value={`${ANALYTICS.attendanceRate}%`} />
        <StatCard label="Admins" value={admins.length} />
        <StatCard label="Platform Status" value="Online" subtext="All systems operational" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle>Pending Event Approvals</CardTitle>
          <div className="mt-4 space-y-3">
            {pending.length === 0 ? (
              <p className="text-sm text-[var(--ink-2)]">No pending approvals.</p>
            ) : (
              pending.map((e) => (
                <div key={e.id} className="flex items-center justify-between border-b border-[var(--hairline)] py-2">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs text-[var(--ink-2)]">{e.organization} &middot; {e.organizer}</p>
                  </div>
                  <Link href="/platform-admin/events">
                    <Button variant="outline" size="sm">Review</Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <CardTitle>Recent Admins</CardTitle>
          <div className="mt-4 space-y-3">
            {admins.map((u) => (
              <div key={u.id} className="flex items-center justify-between border-b border-[var(--hairline)] py-2">
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-[var(--ink-2)]">{u.email}</p>
                </div>
                <StatusBadge status="admin" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Quick Actions</CardTitle>
          <div className="mt-4 grid gap-2">
            <Link href="/platform-admin/roles"><Button variant="outline" className="w-full justify-start">Manage Roles & Permissions</Button></Link>
            <Link href="/platform-admin/users"><Button variant="outline" className="w-full justify-start">Manage Users</Button></Link>
            <Link href="/platform-admin/organizations"><Button variant="outline" className="w-full justify-start">Manage Organizations</Button></Link>
            <Link href="/platform-admin/analytics"><Button variant="outline" className="w-full justify-start">View Analytics</Button></Link>
            <Link href="/platform-admin/settings"><Button variant="outline" className="w-full justify-start">System Settings</Button></Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
