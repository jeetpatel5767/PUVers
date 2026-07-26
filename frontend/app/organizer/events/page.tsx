"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function OrganizerEventsPage() {
  const events = useDemoStore((s) => s.events);
  const myEvents = events.filter((e) => e.organizer === "Priya Mehta");

  return (
    <div>
      <PageHeader
        title="My Events"
        description="All events you've created and manage."
        action={
          <Link href="/organizer/events/create">
            <Button>Create Event</Button>
          </Link>
        }
      />

      <Table headers={["Event", "Date", "Registrations", "Status", "Actions"]}>
        {myEvents.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{formatDate(event.startDate)}</TableCell>
            <TableCell>
              {event.registered}/{event.capacity}
            </TableCell>
            <TableCell>
              <StatusBadge status={event.status} />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/organizer/events/${event.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href={`/organizer/events/${event.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
