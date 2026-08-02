"use client";

import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { ANALYTICS } from "@/constants/mock-data";
import {
  Users,
  CalendarDays,
  Building2,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Eye,
  Bell,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  published: { bg: "hsl(142 50% 45% / 0.1)", text: "hsl(142 50% 35%)", label: "Published" },
  pending_approval: { bg: "hsl(45 90% 50% / 0.1)", text: "hsl(45 80% 35%)", label: "Pending" },
  completed: { bg: "hsl(0 0% 60% / 0.1)", text: "var(--col-dim)", label: "Completed" },
  cancelled: { bg: "hsl(0 60% 50% / 0.1)", text: "hsl(0 60% 45%)", label: "Cancelled" },
  draft: { bg: "hsl(0 0% 85% / 0.3)", text: "var(--col-secondary)", label: "Draft" },
};

export default function SuperAdminDashboard() {
  const events = useDemoStore((s) => s.events);
  const user = useDemoStore((s) => s.user);

  const pending = events.filter((e) => e.status === "pending_approval");
  const published = events.filter((e) => e.status === "published");
  const completed = events.filter((e) => e.status === "completed");
  const totalRegs = events.reduce((sum, e) => sum + e.registered, 0);
  const totalCap = events.reduce((sum, e) => sum + e.capacity, 0);
  const avgFill = totalCap ? Math.round((totalRegs / totalCap) * 100) : 0;

  const uniqueOrgs = [...new Set(events.map((e) => e.organization))];

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const stats = [
    { label: "Total Users", value: ANALYTICS.totalUsers.toLocaleString(), icon: Users, color: "var(--info)" },
    { label: "Total Events", value: events.length, icon: CalendarDays, color: "var(--accent)" },
    { label: "Organizations", value: ANALYTICS.activeOrganizations, icon: Building2, color: "var(--positive)" },
    { label: "Pending Approvals", value: pending.length, icon: ShieldCheck, color: "var(--warning)" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2">
          Platform Overview
        </p>
        <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          {user?.name || "Super Admin"}
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
            {" "}.
          </span>
        </h1>
        <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
          {ANALYTICS.totalRegistrations.toLocaleString()} total registrations &middot; {ANALYTICS.attendanceRate}% attendance rate
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Squircle key={stat.label} cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor: stat.color }}>
                  <Icon className="w-[15px] h-[15px]" style={{ color: stat.color }} strokeWidth={1.5} />
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

      {/* Two-column: pending approvals + right sidebar */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        {/* Left — Pending Approvals */}
        <div className="space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                Pending Approvals
              </h2>
              <Link
                href="/super-admin/events"
                className="text-[0.72rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] font-[family-name:var(--font-ui)] transition-colors duration-200"
              >
                View all
              </Link>
            </div>

            {pending.length === 0 ? (
              <Squircle cornerRadius={22} cornerSmoothing={1} className="p-10 text-center" style={glassStyle}>
                <CheckCircle2 className="w-8 h-8 text-[var(--positive)] mx-auto mb-2 opacity-50" strokeWidth={1} />
                <p className="text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">All clear — no pending approvals.</p>
              </Squircle>
            ) : (
              <div className="space-y-3">
                {pending.map((event) => {
                  const sc = statusColors[event.status];
                  return (
                    <Squircle
                      key={event.id}
                      cornerRadius={22}
                      cornerSmoothing={1}
                      className="p-5 group cursor-pointer transition-all duration-300 hover:-translate-y-[2px]"
                      style={{ ...glassStyle, border: "1px solid hsl(45 90% 50% / 0.15)" }}
                    >
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
                            {event.organization} &middot; by {event.organizer}
                          </p>
                          <p className="text-[0.66rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-1">
                            {new Date(event.startDate).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })} &middot; {event.venue} &middot; Cap: {event.capacity}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                          <Link href={`/super-admin/events`}>
                            <div className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 text-[var(--col-dim)] cursor-pointer">
                              <Eye className="w-[13px] h-[13px]" strokeWidth={1.5} />
                            </div>
                          </Link>
                          <div className="w-8 h-8 rounded-full border border-[var(--positive)] flex items-center justify-center hover:bg-[hsl(142_50%_45%_/_0.1)] transition-colors duration-200 text-[var(--positive)] cursor-pointer">
                            <CheckCircle2 className="w-[13px] h-[13px]" strokeWidth={1.5} />
                          </div>
                          <div className="w-8 h-8 rounded-full border border-[var(--danger)] flex items-center justify-center hover:bg-[hsl(0_60%_50%_/_0.1)] transition-colors duration-200 text-[var(--danger)] cursor-pointer">
                            <XCircle className="w-[13px] h-[13px]" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </Squircle>
                  );
                })}
              </div>
            )}
          </section>

          {/* Recent activity — all events sorted by date */}
          <section>
            <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              Recent Events
            </h2>
            <Squircle cornerRadius={24} cornerSmoothing={1} className="overflow-hidden" style={glassStyle}>
              {events.slice(0, 5).map((event, i) => {
                const fillPct = Math.round((event.registered / event.capacity) * 100);
                const sc = statusColors[event.status] || statusColors.draft;
                const isLast = i === Math.min(4, events.length - 1);
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[hsl(0_0%_100%_/_0.25)]"
                    style={!isLast ? { borderBottom: "1px solid hsl(0 0% 88% / 0.25)" } : {}}
                  >
                    <Squircle
                      cornerRadius={10}
                      cornerSmoothing={1}
                      className="w-9 h-9 flex items-center justify-center text-white text-[0.48rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}
                    >
                      {event.organization.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </Squircle>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.82rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] truncate">
                        {event.title}
                      </p>
                      <p className="text-[0.66rem] text-[var(--col-dim)] font-[family-name:var(--font-ui)] truncate">
                        {event.organization}
                      </p>
                    </div>
                    <Squircle
                      cornerRadius={6}
                      cornerSmoothing={1}
                      className="px-2 py-0.5 text-[0.52rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] flex-shrink-0"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      {sc.label}
                    </Squircle>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-[0.72rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                        {fillPct}%
                      </span>
                      <div className="h-[2px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden w-[48px] mt-1">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${fillPct}%`, background: fillPct >= 90 ? "var(--accent)" : "var(--col-primary)" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Squircle>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Review Events", href: "/super-admin/events", icon: ShieldCheck, primary: true },
                { label: "Manage Users", href: "/super-admin/users", icon: Users },
                { label: "Organizations", href: "/super-admin/organizations", icon: Building2 },
                { label: "Send Notification", href: "/super-admin/notifications", icon: Bell },
                { label: "View Analytics", href: "/super-admin/analytics", icon: BarChart3 },
              ].map((action, i) => (
                <Link key={action.href} href={action.href}>
                  <Squircle
                    cornerRadius={16}
                    cornerSmoothing={1}
                    className={`group w-full inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] transition-all duration-300 font-[family-name:var(--font-display)] cursor-pointer ${
                      action.primary
                        ? "bg-[var(--col-primary)] text-[var(--bg)] hover:opacity-80"
                        : "text-[var(--col-secondary)] hover:bg-[hsl(0_0%_96%_/_0.8)]"
                    } ${i > 0 ? "mt-2" : ""}`}
                    style={
                      action.primary
                        ? { boxShadow: "0 2px 16px var(--shadow-lg)" }
                        : { background: "hsl(0 0% 100% / 0.5)", border: "1px solid hsl(0 0% 85% / 0.4)" }
                    }
                  >
                    {action.label}
                    <Squircle
                      cornerRadius={12}
                      cornerSmoothing={1}
                      className={`w-[34px] h-[34px] border flex items-center justify-center flex-shrink-0 ${
                        action.primary ? "border-white/70" : "border-[var(--col-primary)]"
                      }`}
                    >
                      <action.icon className={`w-[13px] h-[13px] ${action.primary ? "" : "text-[var(--col-primary)]"}`} strokeWidth={1.5} />
                    </Squircle>
                  </Squircle>
                </Link>
              ))}
            </div>
          </Squircle>

          {/* Platform Health */}
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              Platform Health
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Avg Fill Rate</span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">{avgFill}%</span>
              </div>
              <div className="h-[3px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${avgFill}%`, background: avgFill >= 80 ? "var(--accent)" : "var(--col-primary)" }} />
              </div>

              <div className="h-px bg-[hsl(0_0%_85%_/_0.3)]" />

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Attendance Rate</span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">{ANALYTICS.attendanceRate}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Published Events</span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">{published.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Completed</span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">{completed.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Total Capacity</span>
                <span className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">{totalCap.toLocaleString()}</span>
              </div>
            </div>
          </Squircle>

          {/* Top organizations */}
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              Active Organizations
            </h3>
            <div className="space-y-3">
              {uniqueOrgs.slice(0, 5).map((org) => {
                const orgEvents = events.filter((e) => e.organization === org);
                return (
                  <div key={org} className="flex items-center gap-3">
                    <Squircle
                      cornerRadius={8}
                      cornerSmoothing={1}
                      className="w-7 h-7 flex items-center justify-center text-white text-[0.42rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 40%))" }}
                    >
                      {org.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </Squircle>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.74rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-ui)] truncate">{org}</p>
                      <p className="text-[0.6rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">{orgEvents.length} event{orgEvents.length !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Squircle>
        </div>
      </div>
    </div>
  );
}
