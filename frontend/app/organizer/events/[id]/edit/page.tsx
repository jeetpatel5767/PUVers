"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { useState } from "react";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const event = events.find((e) => e.id === id);
  const [showSaved, setShowSaved] = useState(false);

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaved(true);
  };

  return (
    <div>
      <PageHeader
        title="Edit Event"
        action={
          <Link href={`/organizer/events/${id}`}>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </Link>
        }
      />

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Event Title" id="title" defaultValue={event.title} required />
          <Textarea label="Description" id="description" defaultValue={event.description} required />
          <Input label="Venue" id="venue" defaultValue={event.venue} required />
          <Input label="Capacity" id="capacity" type="number" defaultValue={event.capacity} required />
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>

      <Modal
        open={showSaved}
        onClose={() => {
          setShowSaved(false);
          router.push(`/organizer/events/${id}`);
        }}
        title="Event Updated"
        footer={
          <Button
            onClick={() => {
              setShowSaved(false);
              router.push(`/organizer/events/${id}`);
            }}
          >
            OK
          </Button>
        }
      >
        <p className="text-sm text-neutral-600">Event details saved (demo).</p>
      </Modal>
    </div>
  );
}
