"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function StudentEventsPage() {
  const events = useDemoStore((s) => s.events);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const published = events.filter((e) => e.status === "published");
  const categories = ["all", ...new Set(published.map((e) => e.category))];

  const filtered = published.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || e.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <PageHeader title="Browse Events" description="Discover and register for campus events." />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories.map((c) => ({
            value: c,
            label: c === "all" ? "All Categories" : c,
          }))}
          className="sm:w-48"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event) => (
          <Card key={event.id}>
            <div className="flex items-start justify-between gap-2">
              <CardTitle>{event.title}</CardTitle>
              <StatusBadge status={event.category} />
            </div>
            <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{event.description}</p>
            <div className="mt-3 space-y-1 text-xs text-neutral-500">
              <p>{formatDate(event.startDate)}</p>
              <p>{event.venue}</p>
              <p>
                {event.registered}/{event.capacity} registered
              </p>
            </div>
            <Link href={`/student/events/${event.id}`} className="mt-4 inline-block">
              <Button variant="outline" size="sm">
                View & Register
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-neutral-500">No events match your search.</p>
      )}
    </div>
  );
}
