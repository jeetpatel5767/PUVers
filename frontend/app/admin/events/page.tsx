"use client";

import Link from "next/link";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import type { EventStatus } from "@/types";
import {
  Plus,
  MapPin,
  CalendarDays,
  Eye,
  Pencil,
  AlertCircle,
  Globe,
  UploadCloud,
} from "lucide-react";

type FilterStatus = "all" | "DRAFT" | "PENDING_APPROVAL" | "CHANGES_REQUESTED" | "APPROVED" | "PUBLISHED" | "REJECTED" | "COMPLETED";

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Pending", value: "PENDING_APPROVAL" },
  { label: "Changes Requested", value: "CHANGES_REQUESTED" },
  { label: "Approved", value: "APPROVED" },
  { label: "Drafts", value: "DRAFT" },
];

const statusStyleMap: Record<string, { bg: string; text: string; label: string }> = {
  PUBLISHED: { bg: "hsl(142 50% 45% / 0.12)", text: "hsl(142 50% 35%)", label: "Published" },
  published: { bg: "hsl(142 50% 45% / 0.12)", text: "hsl(142 50% 35%)", label: "Published" },
  APPROVED: { bg: "hsl(210 80% 50% / 0.15)", text: "hsl(210 80% 45%)", label: "Approved (Ready to Publish)" },
  PENDING_APPROVAL: { bg: "hsl(45 90% 50% / 0.15)", text: "hsl(45 80% 35%)", label: "Pending Approval" },
  pending_approval: { bg: "hsl(45 90% 50% / 0.15)", text: "hsl(45 80% 35%)", label: "Pending Approval" },
  CHANGES_REQUESTED: { bg: "hsl(25 90% 50% / 0.15)", text: "hsl(25 90% 40%)", label: "Changes Requested" },
  REJECTED: { bg: "hsl(0 65% 50% / 0.12)", text: "hsl(0 65% 45%)", label: "Rejected" },
  cancelled: { bg: "hsl(0 65% 50% / 0.12)", text: "hsl(0 65% 45%)", label: "Rejected" },
  DRAFT: { bg: "hsl(0 0% 85% / 0.3)", text: "var(--col-secondary)", label: "Draft" },
  draft: { bg: "hsl(0 0% 85% / 0.3)", text: "var(--col-secondary)", label: "Draft" },
  COMPLETED: { bg: "hsl(0 0% 60% / 0.15)", text: "var(--col-dim)", label: "Completed" },
  completed: { bg: "hsl(0 0% 60% / 0.15)", text: "var(--col-dim)", label: "Completed" },
};

export default function AdminEventsPage() {
  const events = useDemoStore((s) => s.events);
  const publishEvent = useDemoStore((s) => s.publishEvent);
  const user = useDemoStore((s) => s.user);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const myEvents = events.filter((e) => e.organizer === user?.name || e.organizerId === user?.id || e.organizer === "Priya Mehta");
  const filtered = filter === "all" ? myEvents : myEvents.filter((e) => e.status.toUpperCase() === filter);

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-2 font-[family-name:var(--font-mono)]">
            <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
            Screen 06 — Event Admin Dashboard
          </p>
          <h1 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
            My Events
            <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
          </h1>
          <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
            Manage your event lifecycle: Draft &rarr; Pending Approval &rarr; Approved &rarr; Published.
          </p>
        </div>

        <Link href="/admin/events/create">
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            className="group inline-flex items-center gap-2.5 text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
            style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
          >
            Create Event
            <Squircle
              cornerRadius={12}
              cornerSmoothing={1}
              className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0"
            >
              <Plus className="w-[13px] h-[13px]" strokeWidth={2} />
            </Squircle>
          </Squircle>
        </Link>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-7 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const count = f.value === "all" ? myEvents.length : myEvents.filter((e) => e.status.toUpperCase() === f.value).length;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="text-[0.74rem] font-medium px-3.5 py-[7px] transition-all duration-300 font-[family-name:var(--font-ui)] cursor-pointer whitespace-nowrap"
              style={{
                borderRadius: "12px",
                ...(active
                  ? { background: "var(--col-primary)", color: "var(--bg)", boxShadow: "0 2px 12px hsl(0 0% 10% / 0.2)" }
                  : { background: "hsl(0 0% 100% / 0.4)", color: "var(--col-secondary)", border: "1px solid hsl(0 0% 85% / 0.4)" }),
              }}
            >
              {f.label}
              <span className="ml-1.5 text-[0.6rem] font-[family-name:var(--font-mono)]" style={{ opacity: 0.7 }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <Squircle cornerRadius={22} cornerSmoothing={1} className="p-14 text-center" style={glassStyle}>
          <CalendarDays className="w-10 h-10 text-[var(--col-dim)] mx-auto mb-3 opacity-40" strokeWidth={1} />
          <p className="text-[0.88rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">No events match this filter.</p>
        </Squircle>
      ) : (
        /* Table-style glass card */
        <Squircle cornerRadius={24} cornerSmoothing={1} className="overflow-hidden" style={glassStyle}>
          {/* Column headers */}
          <div
            className="grid items-center gap-4 px-6 py-3.5"
            style={{
              gridTemplateColumns: "1.2fr 130px 100px 160px 130px",
              borderBottom: "1px solid hsl(0 0% 85% / 0.3)",
            }}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Event Title</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Date & Mode</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Registered</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Status</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] text-right">Action</span>
          </div>

          {/* Rows */}
          {filtered.map((event, i) => {
            const normalizedStatus = event.status.toUpperCase();
            const sc = statusStyleMap[normalizedStatus] || statusStyleMap.DRAFT;
            const startD = new Date(event.startDate);
            const dateStr = startD.toLocaleDateString("en", { month: "short", day: "numeric" });
            const isLast = i === filtered.length - 1;

            return (
              <div
                key={event.id}
                className="group grid items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[hsl(0_0%_100%_/_0.25)] relative"
                style={{
                  gridTemplateColumns: "1.2fr 130px 100px 160px 130px",
                  ...(!isLast ? { borderBottom: "1px solid hsl(0 0% 88% / 0.25)" } : {}),
                }}
              >
                {/* Event info */}
                <Link href={`/admin/events/${event.id}`} className="flex items-center gap-3.5 min-w-0">
                  <Squircle
                    cornerRadius={12}
                    cornerSmoothing={1}
                    className="w-10 h-10 flex items-center justify-center text-white text-[0.5rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}
                  >
                    {event.title.slice(0, 2).toUpperCase()}
                  </Squircle>
                  <div className="min-w-0">
                    <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] truncate group-hover:text-[var(--accent)] transition-colors duration-200">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-[10px] h-[10px] text-[var(--col-dim)]" strokeWidth={1.5} />
                      <span className="text-[0.66rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] truncate">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Schedule & Mode */}
                <div>
                  <p className="text-[0.78rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-mono)]">
                    {dateStr}
                  </p>
                  <p className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-0.5">
                    {event.eventMode || "Offline"} &middot; {event.eventCategory || event.category}
                  </p>
                </div>

                {/* Registered / Capacity */}
                <div>
                  <span className="text-[0.78rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                    {event.registered}
                  </span>
                  <span className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                    /{event.capacity}
                  </span>
                </div>

                {/* Status Badge */}
                <div>
                  <Squircle
                    cornerRadius={8}
                    cornerSmoothing={1}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1"
                    style={{ background: sc.bg }}
                  >
                    <span className="text-[0.62rem] font-bold font-[family-name:var(--font-mono)] uppercase tracking-[0.06em]" style={{ color: sc.text }}>
                      {sc.label}
                    </span>
                  </Squircle>
                  {normalizedStatus === "CHANGES_REQUESTED" && (
                    <p className="text-[0.62rem] text-amber-700 font-sans mt-1 line-clamp-1 italic">
                      Remarks provided
                    </p>
                  )}
                </div>

                {/* Action Column */}
                <div className="flex items-center gap-2 justify-end">
                  {normalizedStatus === "APPROVED" ? (
                    <button
                      onClick={() => publishEvent(event.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-[0.7rem] font-bold rounded-lg bg-[var(--col-primary)] text-white hover:opacity-85 transition-all shadow-sm font-[family-name:var(--font-display)]"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      Publish
                    </button>
                  ) : normalizedStatus === "CHANGES_REQUESTED" ? (
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[0.68rem] font-semibold rounded-lg bg-amber-500/15 text-amber-800 hover:bg-amber-500/25 transition-all"
                    >
                      <AlertCircle className="w-3 h-3 text-amber-700" />
                      View Remarks
                    </Link>
                  ) : (
                    <Link href={`/admin/events/${event.id}`}>
                      <div className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 text-[var(--col-dim)] cursor-pointer">
                        <Eye className="w-[13px] h-[13px]" strokeWidth={1.5} />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </Squircle>
      )}
    </div>
  );
}
