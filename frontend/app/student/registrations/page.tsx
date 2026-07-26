"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { ConfirmModal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function StudentRegistrationsPage() {
  const registrations = useDemoStore((s) => s.registrations);
  const cancelRegistration = useDemoStore((s) => s.cancelRegistration);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const active = registrations.filter((r) => r.status !== "cancelled");

  return (
    <div>
      <PageHeader
        title="My Registrations"
        description="View and manage your event registrations."
        action={
          <Link href="/student/events">
            <Button>Browse Events</Button>
          </Link>
        }
      />

      {active.length === 0 ? (
        <EmptyState
          title="No registrations"
          description="You haven't registered for any events yet."
          actionLabel="Browse Events"
          onAction={() => (window.location.href = "/student/events")}
        />
      ) : (
        <Table headers={["Event", "Registered On", "Status", "Actions"]}>
          {active.map((reg) => (
            <TableRow key={reg.id}>
              <TableCell>
                <Link href={`/student/events/${reg.eventId}`} className="underline">
                  {reg.eventTitle}
                </Link>
              </TableCell>
              <TableCell>{formatDate(reg.registeredAt)}</TableCell>
              <TableCell>
                <StatusBadge status={reg.status} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href="/student/tickets">
                    <Button variant="outline" size="sm">
                      Ticket
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => setCancelId(reg.id)}>
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      <ConfirmModal
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onConfirm={() => cancelId && cancelRegistration(cancelId)}
        title="Cancel Registration"
        message="Are you sure you want to cancel this registration?"
        confirmLabel="Cancel Registration"
      />
    </div>
  );
}
