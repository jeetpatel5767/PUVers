"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useDemoStore } from "@/store/demo-store";

export default function CreateEventPage() {
  const router = useRouter();
  const createEvent = useDemoStore((s) => s.createEvent);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    createEvent({
      title: form.get("title") as string,
      description: form.get("description") as string,
      organization: form.get("organization") as string,
      venue: form.get("venue") as string,
      startDate: form.get("startDate") as string,
      endDate: form.get("endDate") as string,
      capacity: Number(form.get("capacity")),
      category: form.get("category") as string,
      organizer: "Priya Mehta",
      requiresApproval: form.get("requiresApproval") === "yes",
    });
    router.push("/organizer/events");
  };

  return (
    <div>
      <PageHeader
        title="Create Event"
        description="Submit a new event for admin approval."
        action={
          <Link href="/organizer/events">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </Link>
        }
      />

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Event Title" id="title" name="title" required defaultValue="New Campus Event" />
          <Textarea
            label="Description"
            id="description"
            name="description"
            required
            defaultValue="Describe your event..."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Organization"
              id="organization"
              name="organization"
              options={[
                { value: "Tech Fest Committee", label: "Tech Fest Committee" },
                { value: "Computer Science Club", label: "Computer Science Club" },
                { value: "Innovation Cell", label: "Innovation Cell" },
              ]}
            />
            <Select
              label="Category"
              id="category"
              name="category"
              options={[
                { value: "Workshop", label: "Workshop" },
                { value: "Conference", label: "Conference" },
                { value: "Competition", label: "Competition" },
                { value: "Career", label: "Career" },
              ]}
            />
          </div>
          <Input label="Venue" id="venue" name="venue" required defaultValue="Seminar Hall 2" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Start Date & Time"
              id="startDate"
              name="startDate"
              type="datetime-local"
              required
              defaultValue="2026-09-01T09:00"
            />
            <Input
              label="End Date & Time"
              id="endDate"
              name="endDate"
              type="datetime-local"
              required
              defaultValue="2026-09-01T17:00"
            />
          </div>
          <Input label="Capacity" id="capacity" name="capacity" type="number" required defaultValue="100" />
          <Select
            label="Requires Registration Approval"
            id="requiresApproval"
            name="requiresApproval"
            options={[
              { value: "no", label: "No — Open registration" },
              { value: "yes", label: "Yes — Manual approval" },
            ]}
          />
          <Button type="submit">Submit for Approval</Button>
        </form>
      </Card>
    </div>
  );
}
