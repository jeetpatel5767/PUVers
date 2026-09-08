"use client";

import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Users,
  Plus,
  ArrowUpRight,
  BarChart3,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const events = useDemoStore((s) => s.events);
  const registrations = useDemoStore((s) => s.registrations);
  const user = useDemoStore((s) => s.user);

  const myEvents = events.filter(
    (e) =>
      e.organizer === "Priya Mehta" ||
      e.organizer === user?.name ||
      e.createdBy === user?.id ||
      e.organizerId === user?.id ||
      !e.createdBy
  );
  const published = myEvents.filter((e) => e.status === "published" || e.status === "PUBLISHED");
  const pending = myEvents.filter((e) => e.status === "pending_approval" || e.status === "PENDING_APPROVAL");
  const approved = myEvents.filter((e) => e.status === "APPROVED");
  const changesReq = myEvents.filter((e) => e.status === "CHANGES_REQUESTED");
  const totalRegs = myEvents.reduce((sum, e) => sum + e.registered, 0);
  const avgFill = myEvents.length
    ? Math.round(
        myEvents.reduce((sum, e) => sum + (e.registered / (e.capacity || 1)) * 100, 0) /
          myEvents.length
      )
    : 0;

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow:
      "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const stats = [
    { label: "My Events", value: myEvents.length, icon: CalendarDays, color: "var(--accent)" },
    { label: "Published", value: published.length, icon: CheckCircle2, color: "var(--positive)" },
    { label: "Pending Approval", value: pending.length, icon: Clock, color: "var(--warning)" },
    { label: "Action Needed", value: changesReq.length + approved.length, icon: Users, color: changesReq.length > 0 ? "hsl(25 95% 53%)" : "var(--info)" },
  ];

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    PUBLISHED: { bg: "hsl(142 50% 45% / 0.1)", text: "hsl(142 50% 35%)", label: "Published" },
    published: { bg: "hsl(142 50% 45% / 0.1)", text: "hsl(142 50% 35%)", label: "Published" },
    PENDING_APPROVAL: { bg: "hsl(45 90% 50% / 0.1)", text: "hsl(45 80% 35%)", label: "Pending Approval" },
    pending_approval: { bg: "hsl(45 90% 50% / 0.1)", text: "hsl(45 80% 35%)", label: "Pending Approval" },
    CHANGES_REQUESTED: { bg: "hsl(25 95% 53% / 0.1)", text: "hsl(25 95% 42%)", label: "Changes Requested" },
    APPROVED: { bg: "hsl(217 91% 60% / 0.1)", text: "hsl(217 91% 50%)", label: "Approved (Ready to Publish)" },
    REJECTED: { bg: "hsl(0 84% 60% / 0.1)", text: "hsl(0 84% 45%)", label: "Rejected" },
    rejected: { bg: "hsl(0 84% 60% / 0.1)", text: "hsl(0 84% 45%)", label: "Rejected" },
    DRAFT: { bg: "hsl(0 0% 85% / 0.3)", text: "var(--col-secondary)", label: "Draft" },
    draft: { bg: "hsl(0 0% 85% / 0.3)", text: "var(--col-secondary)", label: "Draft" },
    COMPLETED: { bg: "hsl(0 0% 60% / 0.1)", text: "var(--col-dim)", label: "Completed" },
    completed: { bg: "hsl(0 0% 60% / 0.1)", text: "var(--col-dim)", label: "Completed" },
    cancelled: { bg: "hsl(0 60% 50% / 0.1)", text: "hsl(0 60% 45%)", label: "Cancelled" },
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2">
          Welcome back
        </p>
        <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          {user?.name || "Admin"}
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
            {" "}.
          </span>
        </h1>
        <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
          Manage your events, registrations, and attendance.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Squircle
              key={stat.label}
              cornerRadius={22}
              cornerSmoothing={1}
              className="p-5"
              style={glassStyle}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-full border flex items-center justify-center"
                  style={{ borderColor: stat.color }}
                >
                  <Icon
                    className="w-[15px] h-[15px]"
                    style={{ color: stat.color }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <p className="text-[1.8rem] font-semibold tracking-[-0.03em] leading-none text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                {stat.value}
              </p>
              <p className="text-[0.68rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-1.5 uppercase tracking-[0.1em]">
                {stat.label}
              </p>
            </Squircle>
          );
        })}
      </div>

      {/* Two-column: recent events + quick actions */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        {/* Recent events */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
              Recent Events
            </h2>
            <Link
              href="/admin/events"
              className="text-[0.72rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] font-[family-name:var(--font-ui)] transition-colors duration-200"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {myEvents.slice(0, 5).map((event) => {
              const fillPct = Math.round(
                (event.registered / event.capacity) * 100
              );
              const sc = statusColors[event.status] || statusColors.draft;

              return (
                <Squircle
                  key={event.id}
                  cornerRadius={22}
                  cornerSmoothing={1}
                  className="p-5 group cursor-pointer transition-all duration-300 hover:-translate-y-[2px]"
                  style={{
                    ...glassStyle,
                    boxShadow:
                      "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                  }}
                >
                  <Link href={`/admin/events/${event.id}`} className="block">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <Squircle
                            cornerRadius={6}
                            cornerSmoothing={1}
                            className="px-2 py-0.5 text-[0.54rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)]"
                            style={{ background: sc.bg, color: sc.text }}
                          >
                            {sc.label}
                          </Squircle>
                          <Squircle
                            cornerRadius={6}
                            cornerSmoothing={1}
                            className="px-2 py-0.5 text-[0.54rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--col-dim)]"
                            style={{ background: "hsl(0 0% 90% / 0.5)" }}
                          >
                            {event.category}
                          </Squircle>
                        </div>
                        <p className="text-[0.88rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] truncate">
                          {event.title}
                        </p>
                        <p className="text-[0.72rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mt-1">
                          {formatDate(event.startDate)} &middot; {event.venue}
                        </p>
                      </div>

                      {/* Fill ring */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="relative w-11 h-11">
                          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <circle
                              cx="18"
                              cy="18"
                              r="15.5"
                              fill="none"
                              stroke="hsl(0 0% 85% / 0.4)"
                              strokeWidth="3"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="15.5"
                              fill="none"
                              stroke={fillPct >= 90 ? "var(--accent)" : "var(--col-primary)"}
                              strokeWidth="3"
                              strokeDasharray={`${(fillPct / 100) * 97.4} 97.4`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[0.52rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)]">
                            {fillPct}%
                          </span>
                        </div>
                        <p className="text-[0.52rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-1">
                          {event.registered}/{event.capacity}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Squircle>
              );
            })}
          </div>
        </section>

        {/* Right column: quick actions + overview */}
        <div className="space-y-4">
          {/* Quick actions */}
          <Squircle
            cornerRadius={22}
            cornerSmoothing={1}
            className="p-5"
            style={glassStyle}
          >
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2.5">
              <Link href="/admin/events/create">
                <Squircle
                  cornerRadius={16}
                  cornerSmoothing={1}
                  className="group w-full inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                  style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
                >
                  Create New Event
                  <Squircle
                    cornerRadius={12}
                    cornerSmoothing={1}
                    className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0"
                  >
                    <Plus className="w-[13px] h-[13px]" strokeWidth={2} />
                  </Squircle>
                </Squircle>
              </Link>

              <Link href="/admin/events">
                <Squircle
                  cornerRadius={16}
                  cornerSmoothing={1}
                  className="group w-full inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] transition-all duration-300 hover:bg-[hsl(0_0%_96%_/_0.8)] font-[family-name:var(--font-display)] cursor-pointer mt-2"
                  style={{
                    background: "hsl(0 0% 100% / 0.5)",
                    border: "1px solid hsl(0 0% 85% / 0.4)",
                  }}
                >
                  Manage Events
                  <Squircle
                    cornerRadius={12}
                    cornerSmoothing={1}
                    className="w-[34px] h-[34px] border border-[var(--col-primary)] flex items-center justify-center flex-shrink-0"
                  >
                    <Eye className="w-[13px] h-[13px] text-[var(--col-primary)]" strokeWidth={1.5} />
                  </Squircle>
                </Squircle>
              </Link>

              <Link href="/admin/analytics">
                <Squircle
                  cornerRadius={16}
                  cornerSmoothing={1}
                  className="group w-full inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] transition-all duration-300 hover:bg-[hsl(0_0%_96%_/_0.8)] font-[family-name:var(--font-display)] cursor-pointer mt-2"
                  style={{
                    background: "hsl(0 0% 100% / 0.5)",
                    border: "1px solid hsl(0 0% 85% / 0.4)",
                  }}
                >
                  View Analytics
                  <Squircle
                    cornerRadius={12}
                    cornerSmoothing={1}
                    className="w-[34px] h-[34px] border border-[var(--col-primary)] flex items-center justify-center flex-shrink-0"
                  >
                    <BarChart3 className="w-[13px] h-[13px] text-[var(--col-primary)]" strokeWidth={1.5} />
                  </Squircle>
                </Squircle>
              </Link>
            </div>
          </Squircle>

          {/* Overview card */}
          <Squircle
            cornerRadius={22}
            cornerSmoothing={1}
            className="p-5"
            style={glassStyle}
          >
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              At a Glance
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                  Avg. Fill Rate
                </span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                  {avgFill}%
                </span>
              </div>
              <div className="h-[3px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${avgFill}%`,
                    background: avgFill >= 80 ? "var(--accent)" : "var(--col-primary)",
                  }}
                />
              </div>

              <div className="h-px bg-[hsl(0_0%_85%_/_0.3)]" />

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                  Active Events
                </span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                  {published.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                  Awaiting Approval
                </span>
                <span className="text-[0.84rem] font-semibold font-[family-name:var(--font-mono)] tabular-nums"
                  style={{ color: pending.length > 0 ? "var(--warning)" : "var(--col-primary)" }}
                >
                  {pending.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                  Total Capacity
                </span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                  {myEvents.reduce((sum, e) => sum + e.capacity, 0)}
                </span>
              </div>
            </div>
          </Squircle>

          {/* Pending approvals highlight */}
          {pending.length > 0 && (
            <Squircle
              cornerRadius={22}
              cornerSmoothing={1}
              className="p-5"
              style={{
                ...glassStyle,
                border: "1px solid hsl(45 90% 50% / 0.2)",
              }}
            >
              <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--warning)] font-[family-name:var(--font-mono)] mb-3">
                Pending Approval
              </h3>
              {pending.map((evt) => (
                <div key={evt.id} className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--warning)] flex-shrink-0" />
                  <p className="text-[0.78rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] flex-1 truncate">
                    {evt.title}
                  </p>
                  <Link href={`/admin/events/${evt.id}`}>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--col-dim)] hover:text-[var(--col-primary)] transition-colors" />
                  </Link>
                </div>
              ))}
            </Squircle>
          )}
        </div>
      </div>
    </div>
  );
}
