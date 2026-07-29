"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { useDemoStore } from "@/store/demo-store";
import { ANALYTICS } from "@/constants/mock-data";

export default function SuperAdminDashboard() {
  const events = useDemoStore((s) => s.events);
  const pending = events.filter((e) => e.status === "pending_approval");

  return (
    <div>
      <PageHeader
        title="Super Admin Dashboard"
        description="Platform overview and pending actions."
        action={
          <Link href="/super-admin/events">
            <Button>Review Events ({pending.length})</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={ANALYTICS.totalUsers} />
        <StatCard label="Total Events" value={ANALYTICS.totalEvents} />
        <StatCard label="Registrations" value={ANALYTICS.totalRegistrations.toLocaleString()} />
        <StatCard label="Pending Approvals" value={pending.length} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
                    <p className="text-xs text-[var(--ink-2)]">{e.organization}</p>
                  </div>
                  <Link href="/super-admin/events">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <CardTitle>Quick Actions</CardTitle>
          <div className="mt-4 grid gap-2">
            <Link href="/super-admin/users"><Button variant="outline" className="w-full justify-start">Manage Users</Button></Link>
            <Link href="/super-admin/organizations"><Button variant="outline" className="w-full justify-start">Manage Organizations</Button></Link>
            <Link href="/super-admin/analytics"><Button variant="outline" className="w-full justify-start">View Analytics</Button></Link>
            <Link href="/super-admin/notifications"><Button variant="outline" className="w-full justify-start">Send Notification</Button></Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
