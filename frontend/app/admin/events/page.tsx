"use client";

import Link from "next/link";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import {
  Plus,
  MapPin,
  Clock,
  Users,
  CalendarDays,
  Eye,
  Pencil,
} from "lucide-react";

type FilterStatus = "all" | "published" | "pending_approval" | "completed";

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Pending", value: "pending_approval" },
  { label: "Completed", value: "completed" },
];

const statusDot: Record<string, string> = {
  published: "var(--positive)",
  pending_approval: "var(--warning)",
  completed: "var(--col-dim)",
  cancelled: "var(--danger)",
  draft: "var(--col-secondary)",
};

const statusLabel: Record<string, string> = {
  published: "Published",
  pending_approval: "Pending Approval",
  completed: "Completed",
  cancelled: "Cancelled",
  draft: "Draft",
};

export default function AdminEventsPage() {
  const events = useDemoStore((s) => s.events);
  const [filter, setFilter] = useState<FilterStatus>("all");



  const myEvents = events.filter((e) => e.organizer === "Priya Mehta");
  const filtered = filter === "all" ? myEvents : myEvents.filter((e) => e.status === filter);

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
          <h1 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
            My Events
            <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
              {" "}.
            </span>
          </h1>
          <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
            {myEvents.length} event{myEvents.length !== 1 ? "s" : ""} created &middot;{" "}
            {myEvents.reduce((s, e) => s + e.registered, 0)} total registrations
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
      <div className="flex items-center gap-2 mb-7">
        {FILTERS.map((f) => {
          const count = f.value === "all" ? myEvents.length : myEvents.filter((e) => e.status === f.value).length;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="text-[0.74rem] font-medium px-3.5 py-[7px] transition-all duration-300 font-[family-name:var(--font-ui)] cursor-pointer"
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
              gridTemplateColumns: "1fr 140px 120px 100px 88px",
              borderBottom: "1px solid hsl(0 0% 85% / 0.3)",
            }}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Event</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Schedule</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Capacity</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Status</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] text-right">Actions</span>
          </div>

          {/* Rows */}
          {filtered.map((event, i) => {
            const fillPct = Math.round((event.registered / event.capacity) * 100);
            const startD = new Date(event.startDate);
            const monthShort = startD.toLocaleDateString("en", { month: "short" });
            const dayNum = startD.getDate();
            const timeStart = startD.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: true });
            const isLast = i === filtered.length - 1;
            const dot = statusDot[event.status] || statusDot.draft;
            const label = statusLabel[event.status] || "Draft";
            return (
              <div
                key={event.id}
                className="group grid items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[hsl(0_0%_100%_/_0.25)] relative"
                style={{
                  gridTemplateColumns: "1fr 140px 120px 100px 88px",
                  ...(!isLast ? { borderBottom: "1px solid hsl(0 0% 88% / 0.25)" } : {}),
                }}
              >
                {/* Event info */}
                <Link href={`/admin/events/${event.id}`} className="flex items-center gap-4 min-w-0">
                  {/* Org initials squircle */}
                  <Squircle
                    cornerRadius={12}
                    cornerSmoothing={1}
                    className="w-10 h-10 flex items-center justify-center text-white text-[0.5rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}
                  >
                    {event.organization.split(" ").map((w) => w[0]).join("").slice(0, 2)}
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

                {/* Schedule */}
                <div>
                  <p className="text-[0.78rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-mono)]">
                    {monthShort} {dayNum}
                  </p>
                  <p className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-0.5">
                    {timeStart}
                  </p>
                </div>

                {/* Capacity */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[0.78rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                      {event.registered}
                    </span>
                    <span className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                      / {event.capacity}
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden w-[72px]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${fillPct}%`,
                        background: fillPct >= 90 ? "var(--accent)" : "var(--col-primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: dot }} />
                  <span className="text-[0.72rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                    {label}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-end">
                  <Link href={`/admin/events/${event.id}`}>
                    <div className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 text-[var(--col-dim)] cursor-pointer">
                      <Eye className="w-[13px] h-[13px]" strokeWidth={1.5} />
                    </div>
                  </Link>
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <div className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center hover:border-[var(--col-primary)] hover:text-[var(--col-primary)] transition-colors duration-200 text-[var(--col-dim)] cursor-pointer">
                      <Pencil className="w-[12px] h-[12px]" strokeWidth={1.5} />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </Squircle>
      )}
    </div>
  );
}
