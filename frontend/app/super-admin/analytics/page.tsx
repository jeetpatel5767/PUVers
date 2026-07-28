"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardTitle } from "@/components/ui/card";
import { useDemoStore } from "@/store/demo-store";
import { ANALYTICS, ALL_USERS, ORGANIZATIONS } from "@/constants/mock-data";

export default function SuperAdminAnalyticsPage() {
  const events = useDemoStore((s) => s.events);
  const published = events.filter((e) => e.status === "published").length;
  const completed = events.filter((e) => e.status === "completed").length;

  const categoryBreakdown = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});

  const departmentBreakdown: Record<string, number> = {};
  ALL_USERS.forEach((u) => {
    const key = u.department || u.organization || "Other";
    departmentBreakdown[key] = (departmentBreakdown[key] || 0) + 1;
  });

  return (
    <div>
      <PageHeader title="Analytics" description="Platform-wide metrics and insights." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={ANALYTICS.totalUsers} />
        <StatCard label="Total Events" value={ANALYTICS.totalEvents} />
        <StatCard label="Registrations" value={ANALYTICS.totalRegistrations.toLocaleString()} />
        <StatCard label="Attendance Rate" value={`${ANALYTICS.attendanceRate}%`} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Orgs" value={ANALYTICS.activeOrganizations} />
        <StatCard label="Published Events" value={published} />
        <StatCard label="Completed Events" value={completed} />
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
          <CardTitle>Events by Category</CardTitle>
          <div className="mt-4 space-y-3">
            {Object.entries(categoryBreakdown).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between border-b border-neutral-100 py-2">
                <span className="text-sm">{cat}</span>
                <span className="border border-black px-2 py-0.5 text-xs font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Users by Department / Org</CardTitle>
          <div className="mt-4 space-y-3">
            {Object.entries(departmentBreakdown).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between border-b border-neutral-100 py-2">
                <span className="text-sm">{dept}</span>
                <span className="border border-black px-2 py-0.5 text-xs font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
