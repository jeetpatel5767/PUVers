"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardTitle } from "@/components/ui/card";
import { useDemoStore } from "@/store/demo-store";
import { ANALYTICS, ALL_USERS, ORGANIZATIONS } from "@/constants/mock-data";

export default function PlatformAdminAnalyticsPage() {
  const events = useDemoStore((s) => s.events);
  const totalCapacity = events.reduce((s, e) => s + e.capacity, 0);
  const totalRegistered = events.reduce((s, e) => s + e.registered, 0);
  const fillRate = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;

  const statusCounts = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});

  const orgEventCounts = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.organization] = (acc[e.organization] || 0) + 1;
    return acc;
  }, {});

  const roleCounts = ALL_USERS.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Platform Analytics" description="Comprehensive platform-wide metrics and trends." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={ANALYTICS.totalUsers} />
        <StatCard label="Total Events" value={ANALYTICS.totalEvents} />
        <StatCard label="Registrations" value={ANALYTICS.totalRegistrations.toLocaleString()} />
        <StatCard label="Attendance Rate" value={`${ANALYTICS.attendanceRate}%`} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Orgs" value={ANALYTICS.activeOrganizations} />
        <StatCard label="Fill Rate" value={`${fillRate}%`} />
        <StatCard label="Total Capacity" value={totalCapacity.toLocaleString()} />
        <StatCard label="Pending Approvals" value={ANALYTICS.pendingApprovals} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Monthly Registrations</CardTitle>
          <div className="mt-4 flex items-end gap-2 h-40">
            {ANALYTICS.monthlyRegistrations.map((val, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium">{val}</span>
                <div className="w-full bg-black" style={{ height: `${(val / 920) * 100}%` }} />
                <span className="text-xs text-neutral-500">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Top Events by Registrations</CardTitle>
          <div className="mt-4 space-y-3">
            {ANALYTICS.topEvents.map((e, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{e.name}</p>
                  <div className="mt-1 h-2 bg-neutral-100">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${(e.registrations / 800) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium">{e.registrations}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Events by Status</CardTitle>
          <div className="mt-4 space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between border-b border-neutral-100 py-2">
                <span className="text-sm capitalize">{status.replace("_", " ")}</span>
                <span className="border border-black px-2 py-0.5 text-xs font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Events by Organization</CardTitle>
          <div className="mt-4 space-y-3">
            {Object.entries(orgEventCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([org, count]) => (
                <div key={org} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm">{org}</p>
                    <div className="mt-1 h-2 bg-neutral-100">
                      <div className="h-full bg-black" style={{ width: `${(count / 5) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Users by Role</CardTitle>
          <div className="mt-4 space-y-3">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between border-b border-neutral-100 py-2">
                <span className="text-sm capitalize">{role.replace("_", " ")}</span>
                <span className="border border-black px-2 py-0.5 text-xs font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Organization Activity</CardTitle>
          <div className="mt-4 space-y-3">
            {ORGANIZATIONS.map((org) => (
              <div key={org.id} className="flex items-center justify-between border-b border-neutral-100 py-2">
                <div>
                  <p className="text-sm font-medium">{org.name}</p>
                  <p className="text-xs text-neutral-500">{org.type} &middot; {org.members} members</p>
                </div>
                <span className="border border-black px-2 py-0.5 text-xs font-medium">{org.events} events</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
