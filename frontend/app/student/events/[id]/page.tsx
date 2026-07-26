"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function StudentEventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const registrations = useDemoStore((s) => s.registrations);
  const registerForEvent = useDemoStore((s) => s.registerForEvent);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registered, setRegistered] = useState(false);

  const event = events.find((e) => e.id === id);
  const existingReg = registrations.find(
    (r) => r.eventId === id && r.status !== "cancelled",
  );

  if (!event) {
    return (
      <div className="py-12 text-center">
        <p>Event not found.</p>
        <Link href="/student/events" className="mt-4 inline-block underline">
          Back to events
        </Link>
      </div>
    );
  }

  const isFull = event.registered >= event.capacity;

  const handleRegister = () => {
    registerForEvent(id);
    setRegistered(true);
    setShowRegisterModal(false);
  };

  return (
    <div>
      <PageHeader
        title={event.title}
        action={
          <Link href="/student/events">
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={event.status} />
              <StatusBadge status={event.category} />
              {event.requiresApproval && <StatusBadge status="requires approval" />}
            </div>
            <p className="mt-4 text-neutral-700">{event.description}</p>
          </Card>

          <Card>
            <h3 className="font-semibold">Event Details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <dt className="text-neutral-500">Organization</dt>
                <dd>{event.organization}</dd>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <dt className="text-neutral-500">Organizer</dt>
                <dd>{event.organizer}</dd>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <dt className="text-neutral-500">Venue</dt>
                <dd>{event.venue}</dd>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <dt className="text-neutral-500">Start</dt>
                <dd>{formatDateTime(event.startDate)}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-neutral-500">End</dt>
                <dd>{formatDateTime(event.endDate)}</dd>
              </div>
            </dl>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="font-semibold">Registration</h3>
            <p className="mt-2 text-2xl font-bold">
              {event.registered} / {event.capacity}
            </p>
            <p className="text-sm text-neutral-500">spots filled</p>

            {existingReg || registered ? (
              <div className="mt-4 space-y-2">
                <StatusBadge status={existingReg?.status ?? "registered"} />
                <p className="text-sm text-neutral-600">You are registered for this event.</p>
                <Link href="/student/tickets">
                  <Button variant="outline" className="w-full mt-2">
                    View Ticket
                  </Button>
                </Link>
              </div>
            ) : event.status === "published" ? (
              <Button
                className="mt-4 w-full"
                onClick={() => setShowRegisterModal(true)}
              >
                {isFull ? "Join Waitlist" : "Register Now"}
              </Button>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">Registration not available.</p>
            )}
          </Card>
        </div>
      </div>

      <Modal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title={isFull ? "Join Waitlist" : "Confirm Registration"}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowRegisterModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRegister}>
              {isFull ? "Join Waitlist" : "Confirm"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-neutral-600">
          {isFull
            ? `This event is full. You'll be added to the waitlist for "${event.title}".`
            : `Register for "${event.title}" on ${formatDate(event.startDate)}? A QR ticket will be issued immediately.`}
        </p>
      </Modal>
    </div>
  );
}
