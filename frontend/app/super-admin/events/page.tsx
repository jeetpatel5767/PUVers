"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { ConfirmModal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function SuperAdminEventsPage() {
  const events = useDemoStore((s) => s.events);
  const approveEvent = useDemoStore((s) => s.approveEvent);
  const rejectEvent = useDemoStore((s) => s.rejectEvent);
  const [action, setAction] = useState<{ id: string; type: "approve" | "reject" } | null>(null);

  const pending = events.filter((e) => e.status === "pending_approval");
  const allReview = [...pending, ...events.filter((e) => e.status !== "pending_approval").slice(0, 3)];

  return (
    <div>
      <PageHeader
        title="Event Approvals"
        description="Review and approve events submitted by admins."
      />

      {pending.length > 0 && (
        <p className="mb-4 border border-black bg-neutral-50 px-4 py-2 text-sm">
          {pending.length} event(s) awaiting your approval
        </p>
      )}

      <Table headers={["Event", "Organization", "Date", "Status", "Actions"]}>
        {allReview.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{event.organization}</TableCell>
            <TableCell>{formatDate(event.startDate)}</TableCell>
            <TableCell><StatusBadge status={event.status} /></TableCell>
            <TableCell>
              {event.status === "pending_approval" ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setAction({ id: event.id, type: "approve" })}>
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAction({ id: event.id, type: "reject" })}>
                    Reject
                  </Button>
                </div>
              ) : (
                <span className="text-xs text-neutral-500">—</span>
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
            ? "This event will be published and visible to students."
            : "This event will be rejected and hidden from students."
        }
        confirmLabel={action?.type === "approve" ? "Approve" : "Reject"}
      />
    </div>
  );
}
