"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function StudentDashboard() {
  const registrations = useDemoStore((s) => s.registrations);
  const tickets = useDemoStore((s) => s.tickets);
  const certificates = useDemoStore((s) => s.certificates);
  const notifications = useDemoStore((s) => s.notifications);
  const events = useDemoStore((s) => s.events);

  const activeRegs = registrations.filter((r) => r.status !== "cancelled");
  const unread = notifications.filter((n) => !n.read).length;
  const upcoming = events.filter((e) => e.status === "published").slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Student Dashboard"
        description="Welcome back! Here's your campus activity overview."
        action={
          <Link href="/student/events">
            <Button>Browse Events</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Registrations" value={activeRegs.length} />
        <StatCard label="Active Tickets" value={tickets.filter((t) => t.status === "active").length} />
        <StatCard label="Certificates" value={certificates.length} />
        <StatCard label="Unread Notifications" value={unread} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {upcoming.map((event) => (
              <Card key={event.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <p className="mt-1 text-xs text-neutral-500">
                      {formatDate(event.startDate)} · {event.venue}
                    </p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
                <Link href={`/student/events/${event.id}`} className="mt-3 inline-block">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-semibold">Recent Registrations</h2>
          <div className="space-y-3">
            {activeRegs.slice(0, 3).map((reg) => (
              <Card key={reg.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{reg.eventTitle}</p>
                    <p className="text-xs text-neutral-500">{formatDate(reg.registeredAt)}</p>
                  </div>
                  <StatusBadge status={reg.status} />
                </div>
              </Card>
            ))}
            {activeRegs.length === 0 && (
              <p className="text-sm text-neutral-500">No registrations yet.</p>
            )}
          </div>
          <Link href="/student/registrations" className="mt-4 inline-block text-sm underline">
            View all registrations
          </Link>
        </div>
      </div>
    </div>
  );
}
