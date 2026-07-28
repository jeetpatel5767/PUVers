"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const events = useDemoStore((s) => s.events);
  const myEvents = events.filter((e) => e.organizer === "Priya Mehta");
  const published = myEvents.filter((e) => e.status === "published");
  const pending = myEvents.filter((e) => e.status === "pending_approval");
  const totalRegs = myEvents.reduce((sum, e) => sum + e.registered, 0);

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Manage your events, registrations, and attendance."
        action={
          <Link href="/admin/events/create">
            <Button>Create Event</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Events" value={myEvents.length} />
        <StatCard label="Published" value={published.length} />
        <StatCard label="Pending Approval" value={pending.length} />
        <StatCard label="Total Registrations" value={totalRegs} />
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent Events</h2>
          <Link href="/admin/events" className="text-sm underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {myEvents.slice(0, 5).map((event) => (
            <Card key={event.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-xs text-neutral-500">
                    {formatDate(event.startDate)} · {event.registered} registered
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={event.status} />
                  <Link href={`/admin/events/${event.id}`}>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
