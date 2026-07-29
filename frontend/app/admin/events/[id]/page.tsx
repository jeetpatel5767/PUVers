"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { useDemoStore } from "@/store/demo-store";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function AdminEventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="py-12 text-center">
        <p>Event not found.</p>
        <Link href="/admin/events" className="mt-4 inline-block underline">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={event.title}
        action={
          <div className="flex gap-2">
            <Link href={`/admin/events/${id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button variant="ghost" size="sm">
                Back
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mb-6 flex gap-2">
        <StatusBadge status={event.status} />
        <StatusBadge status={event.category} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatCard label="Registrations" value={`${event.registered}/${event.capacity}`} />
        <StatCard label="Spots Left" value={Math.max(0, event.capacity - event.registered)} />
        <StatCard label="Fill Rate" value={`${Math.round((event.registered / event.capacity) * 100)}%`} />
      </div>

      <Card className="mb-6">
        <p className="text-[var(--ink-2)]">{event.description}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div><span className="text-[var(--ink-3)]">Venue:</span> {event.venue}</div>
          <div><span className="text-[var(--ink-3)]">Organization:</span> {event.organization}</div>
          <div><span className="text-[var(--ink-3)]">Start:</span> {formatDateTime(event.startDate)}</div>
          <div><span className="text-[var(--ink-3)]">End:</span> {formatDateTime(event.endDate)}</div>
        </dl>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Link href={`/admin/events/${id}/registrations`}>
          <Card className="text-center hover:bg-[var(--bg-card-hover)]">
            <p className="font-semibold">Registrations</p>
            <p className="text-sm text-[var(--ink-3)]">View & export attendees</p>
          </Card>
        </Link>
        <Link href={`/admin/events/${id}/attendance`}>
          <Card className="text-center hover:bg-[var(--bg-card-hover)]">
            <p className="font-semibold">Attendance</p>
            <p className="text-sm text-[var(--ink-3)]">QR scanner & check-ins</p>
          </Card>
        </Link>
        <Link href={`/admin/events/${id}/staff`}>
          <Card className="text-center hover:bg-[var(--bg-card-hover)]">
            <p className="font-semibold">Event Staff</p>
            <p className="text-sm text-[var(--ink-3)]">Assign scanners & coordinators</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
