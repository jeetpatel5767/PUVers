"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { ConfirmModal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function PlatformAdminEventsPage() {
  const events = useDemoStore((s) => s.events);
  const approveEvent = useDemoStore((s) => s.approveEvent);
  const rejectEvent = useDemoStore((s) => s.rejectEvent);
  const [action, setAction] = useState<{ id: string; type: "approve" | "reject" } | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? events
      : filter === "pending_approval"
        ? events.filter((e) => e.status === "pending_approval")
        : events.filter((e) => e.status === filter);

  const pending = events.filter((e) => e.status === "pending_approval");

  return (
    <div>
      <PageHeader
        title="All Events"
        description="View, approve, or reject all events across the platform."
      />

      {pending.length > 0 && (
        <p className="mb-4 border border-[var(--border-card)] bg-[var(--bg-card)] px-4 py-2 text-sm">
          {pending.length} event(s) awaiting approval
        </p>
      )}

      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium">Filter:</span>
        {["all", "pending_approval", "published", "completed"].map((s) => (
          <Button
            key={s}
            variant={filter === s ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "All" : s === "pending_approval" ? "Pending" : s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>

      <Table headers={["Event", "Organization", "Organizer", "Date", "Capacity", "Status", "Actions"]}>
        {filtered.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{event.organization}</TableCell>
            <TableCell>{event.organizer}</TableCell>
            <TableCell>{formatDate(event.startDate)}</TableCell>
            <TableCell>{event.registered}/{event.capacity}</TableCell>
            <TableCell><StatusBadge status={event.status} /></TableCell>
            <TableCell>
              {event.status === "pending_approval" ? (
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => setAction({ id: event.id, type: "approve" })}>
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAction({ id: event.id, type: "reject" })}>
                    Reject
                  </Button>
                </div>
              ) : (
                <span className="text-xs text-[var(--ink-2)]">—</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <ConfirmModal
        open={!!action}
        onClose={() => setAction(null)}
        onConfirm={() => {
          if (!action) return;
          if (action.type === "approve") approveEvent(action.id);
          else rejectEvent(action.id);
        }}
        title={action?.type === "approve" ? "Approve Event" : "Reject Event"}
        message={
          action?.type === "approve"
            ? "This event will be published and visible to all students."
            : "This event will be rejected. The admin will be notified."
        }
        confirmLabel={action?.type === "approve" ? "Approve" : "Reject"}
      />
    </div>
  );
}
