"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { REGISTRATIONS } from "@/constants/mock-data";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function EventRegistrationsPage() {
  const params = useParams();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const registrations = useDemoStore((s) => s.registrations);
  const event = events.find((e) => e.id === id);
  const eventRegs = registrations.filter((r) => r.eventId === id);
  const [showExport, setShowExport] = useState(false);

  return (
    <div>
      <PageHeader
        title={`Registrations — ${event?.title ?? "Event"}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowExport(true)}>
              Export CSV
            </Button>
            <Link href={`/admin/events/${id}`}>
              <Button variant="ghost" size="sm">
                Back
              </Button>
            </Link>
          </div>
        }
      />

      <p className="mb-4 text-sm text-[var(--ink-3)]">
        {eventRegs.length} registration(s) · Capacity {event?.capacity}
      </p>

      <Table headers={["Student", "Email", "Registered", "Status"]}>
        {(eventRegs.length > 0 ? eventRegs : REGISTRATIONS.filter((r) => r.eventId === "evt-1")).map(
          (reg) => (
            <TableRow key={reg.id}>
              <TableCell>{reg.studentName}</TableCell>
              <TableCell>{reg.studentEmail}</TableCell>
              <TableCell>{formatDate(reg.registeredAt)}</TableCell>
              <TableCell>
                <StatusBadge status={reg.status} />
              </TableCell>
            </TableRow>
          ),
        )}
      </Table>

      <Modal
        open={showExport}
        onClose={() => setShowExport(false)}
        title="Export Registrations"
        footer={<Button onClick={() => setShowExport(false)}>Done</Button>}
      >
        <p className="text-sm text-[var(--ink-3)]">
          CSV export started with {eventRegs.length || 3} records (demo).
        </p>
      </Modal>
    </div>
  );
}
