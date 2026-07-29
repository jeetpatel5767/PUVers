"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import { useDemoStore } from "@/store/demo-store";
import { ANALYTICS } from "@/constants/mock-data";

export default function AdminAnalyticsPage() {
  const events = useDemoStore((s) => s.events);
  const myEvents = events.filter((e) => e.organizer === "Priya Mehta");
  const totalRegs = myEvents.reduce((sum, e) => sum + e.registered, 0);

  return (
    <div>
      <PageHeader title="Analytics" description="Performance metrics for your events." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Your Events" value={myEvents.length} />
        <StatCard label="Total Registrations" value={totalRegs} />
        <StatCard label="Avg Fill Rate" value="72%" />
        <StatCard label="Attendance Rate" value={`${ANALYTICS.attendanceRate}%`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold font-[family-name:var(--font-display)]">Top Events by Registrations</h3>
          <div className="mt-4 space-y-3">
            {myEvents
              .sort((a, b) => b.registered - a.registered)
              .slice(0, 5)
              .map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{e.title}</p>
                    <div className="mt-1 h-2 bg-[var(--bg-card)] rounded-full">
                      <div
                        className="h-full bg-[var(--accent-500)]"
                        style={{ width: `${(e.registered / e.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{e.registered}</span>
                </div>
              ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold font-[family-name:var(--font-display)]">Monthly Registrations</h3>
          <div className="mt-4 flex items-end gap-2 h-40">
            {ANALYTICS.monthlyRegistrations.map((val, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full bg-[var(--accent-500)]" style={{ height: `${(val / 920) * 100}%` }} />
                <span className="text-xs text-[var(--ink-3)]">M{i + 1}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
