"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { QRDisplay } from "@/components/shared/qr-display";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function StudentTicketsPage() {
  const tickets = useDemoStore((s) => s.tickets);
  const [selected, setSelected] = useState<(typeof tickets)[0] | null>(null);

  return (
    <div>
      <PageHeader
        title="My Tickets"
        description="Your QR tickets for registered events. Show at venue for check-in."
      />

      {tickets.length === 0 ? (
        <EmptyState
          title="No tickets"
          description="Register for an event to receive a QR ticket."
          actionLabel="Browse Events"
          onAction={() => (window.location.href = "/student/events")}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{ticket.eventTitle}</p>
                  <p className="text-xs text-neutral-500">Issued {formatDate(ticket.issuedAt)}</p>
                </div>
                <StatusBadge status={ticket.status} />
              </div>
              <div className="mt-4 flex justify-center">
                <QRDisplay code={ticket.ticketCode} size={120} />
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setSelected(ticket)}
              >
                View Full Ticket
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Event Ticket"
        size="sm"
        footer={<Button onClick={() => setSelected(null)}>Close</Button>}
      >
        {selected && (
          <div className="flex flex-col items-center">
            <QRDisplay code={selected.ticketCode} size={200} />
            <p className="mt-4 text-center font-semibold">{selected.eventTitle}</p>
            <p className="text-sm text-neutral-500">Show this QR code at the venue entrance</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
