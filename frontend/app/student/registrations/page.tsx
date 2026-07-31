"use client";

import Link from "next/link";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import { CalendarSearch, Ticket, X, ChevronRight, Clock } from "lucide-react";

export default function StudentRegistrationsPage() {
  const registrations = useDemoStore((s) => s.registrations);
  const events = useDemoStore((s) => s.events);
  const cancelRegistration = useDemoStore((s) => s.cancelRegistration);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "registered" | "waitlisted">("all");

  const active = registrations.filter((r) => r.status !== "cancelled");
  const filtered = filter === "all" ? active : active.filter((r) => r.status === filter);

  const regCount = active.filter((r) => r.status === "registered").length;
  const waitCount = active.filter((r) => r.status === "waitlisted").length;

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-4 font-[family-name:var(--font-mono)]">
          <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
          Registrations
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              My Registrations
              <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
                {" "}.
              </span>
            </h1>
            <p className="mt-2 text-[0.88rem] text-[var(--col-secondary)] leading-[1.6] font-[family-name:var(--font-ui)]">
              View and manage your event registrations.
            </p>
          </div>

          {/* Browse events button */}
          <Link href="/student/events" className="group flex-shrink-0">
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              className="inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.02em] pl-4 pr-[5px] py-[5px] transition-all duration-300 font-[family-name:var(--font-display)]"
              style={{
                background: "var(--col-primary)",
                color: "var(--bg)",
                boxShadow: "0 4px 20px hsl(0 0% 10% / 0.2)",
              }}
            >
              Browse Events
              <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-white fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Squircle>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Active", value: active.length, accent: false },
          { label: "Registered", value: regCount, accent: true },
          { label: "Waitlisted", value: waitCount, accent: false },
        ].map((stat) => (
          <Squircle
            key={stat.label}
            cornerRadius={22}
            cornerSmoothing={1}
            className="p-4 flex items-center justify-between"
            style={{
              background: "hsl(0 0% 96% / 0.42)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              boxShadow: "0 2px 16px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            <span className="text-[0.7rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] font-medium">
              {stat.label}
            </span>
            <span className={`text-[1.5rem] font-semibold tracking-[-0.02em] font-[family-name:var(--font-mono)] tabular-nums ${stat.accent ? "text-[var(--accent)]" : "text-[var(--col-primary)]"}`}>
              {stat.value}
            </span>
          </Squircle>
        ))}
      </div>

      {/* Filter pills */}
      <Squircle
        cornerRadius={16}
        cornerSmoothing={1}
        className="inline-flex items-center gap-[3px] p-[3px] mb-6"
        style={{
          background: "hsl(0 0% 96% / 0.42)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.5), 0 1px 4px var(--shadow)",
        }}
      >
        {(["all", "registered", "waitlisted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[0.74rem] font-medium px-4 py-[8px] transition-all duration-300 font-[family-name:var(--font-ui)] whitespace-nowrap capitalize ${
              filter === f
                ? "bg-[var(--col-primary)] text-[var(--bg)]"
                : "text-[var(--col-secondary)] hover:text-[var(--col-primary)]"
            }`}
            style={{ borderRadius: "13px" }}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </Squircle>

      {/* Registration list */}
      {filtered.length === 0 ? (
        <Squircle
          cornerRadius={28}
          cornerSmoothing={1}
          className="py-16 flex flex-col items-center justify-center"
          style={{
            background: "hsl(0 0% 96% / 0.42)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
          }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "hsl(25 65% 45% / 0.1)" }}>
            <CalendarSearch className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <p className="text-[0.92rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">
            No registrations
          </p>
          <p className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-5">
            You haven&apos;t registered for any events yet.
          </p>
          <Link href="/student/events" className="group">
            <Squircle
              cornerRadius={14}
              cornerSmoothing={1}
              className="inline-flex items-center gap-2 text-[0.78rem] font-medium pl-4 pr-[5px] py-[5px] font-[family-name:var(--font-display)]"
              style={{ background: "var(--col-primary)", color: "var(--bg)" }}
            >
              Browse Events
              <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[9px] h-[9px] stroke-white fill-none stroke-2 -rotate-45 group-hover:rotate-0 transition-transform duration-300" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Squircle>
          </Link>
        </Squircle>
      ) : (
        <div className="space-y-3">
          {filtered.map((reg) => {
            const event = events.find((e) => e.id === reg.eventId);
            const d = new Date(reg.registeredAt);
            const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
            const isWaitlisted = reg.status === "waitlisted";

            return (
              <Squircle
                key={reg.id}
                cornerRadius={24}
                cornerSmoothing={1}
                className="p-5 transition-all duration-300 hover:-translate-y-[2px]"
                style={{
                  background: "hsl(0 0% 96% / 0.42)",
                  backdropFilter: "blur(24px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                  boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6), inset 0 -1px 0 hsl(0 0% 80% / 0.1)",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Status indicator — accent ring with icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: isWaitlisted ? "hsl(40 70% 50% / 0.1)" : "hsl(25 65% 45% / 0.1)",
                      border: `1.5px solid ${isWaitlisted ? "hsl(40 70% 50% / 0.3)" : "hsl(25 65% 45% / 0.3)"}`,
                    }}
                  >
                    {isWaitlisted ? (
                      <Clock className="w-4 h-4 text-[hsl(40,70%,45%)]" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[var(--accent)] fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <Link href={`/student/events/${reg.eventId}`} className="group/title">
                        <h3 className="text-[0.92rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] leading-[1.3] group-hover/title:text-[var(--accent)] transition-colors duration-200">
                          {reg.eventTitle}
                        </h3>
                      </Link>

                      {/* Status badge */}
                      <span
                        className="text-[0.56rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] px-2.5 py-1 flex-shrink-0"
                        style={{
                          borderRadius: "20px",
                          background: isWaitlisted ? "hsl(40 70% 50% / 0.1)" : "hsl(25 65% 45% / 0.1)",
                          color: isWaitlisted ? "hsl(40 70% 40%)" : "var(--accent)",
                          border: `1px solid ${isWaitlisted ? "hsl(40 70% 50% / 0.2)" : "hsl(25 65% 45% / 0.15)"}`,
                        }}
                      >
                        {reg.status}
                      </span>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-[0.72rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-3">
                      <span>Registered {formatDate(reg.registeredAt)}</span>
                      <span className="w-px h-3" style={{ background: "hsl(0 0% 80% / 0.4)" }} />
                      <span>{timeStr}</span>
                      {event?.venue && (
                        <>
                          <span className="w-px h-3" style={{ background: "hsl(0 0% 80% / 0.4)" }} />
                          <span className="truncate">{event.venue}</span>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link href="/student/tickets" className="group/btn">
                        <Squircle
                          cornerRadius={12}
                          cornerSmoothing={1}
                          className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium px-3 py-[6px] transition-all duration-200 font-[family-name:var(--font-ui)]"
                          style={{
                            background: "hsl(0 0% 100% / 0.55)",
                            border: "1px solid hsl(0 0% 85% / 0.4)",
                          }}
                        >
                          <Ticket className="w-3 h-3 text-[var(--accent)]" />
                          View Ticket
                          <ChevronRight className="w-3 h-3 text-[var(--col-dim)] group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                        </Squircle>
                      </Link>

                      <button
                        onClick={() => setCancelId(reg.id)}
                        className="inline-flex items-center gap-1 text-[0.7rem] font-medium px-3 py-[6px] text-[var(--col-dim)] hover:text-red-500 transition-colors duration-200 font-[family-name:var(--font-ui)]"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Squircle>
            );
          })}
        </div>
      )}

      {/* Cancel confirmation modal */}
      {cancelId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{ background: "hsl(0 0% 0% / 0.3)", backdropFilter: "blur(8px)" }}
            onClick={() => setCancelId(null)}
          />
          <Squircle
            cornerRadius={28}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-[380px] p-6 mx-4"
            style={{
              background: "hsl(0 0% 96% / 0.85)",
              backdropFilter: "blur(40px) saturate(1.6)",
              WebkitBackdropFilter: "blur(40px) saturate(1.6)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-2">
              Cancel Registration
            </h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] leading-[1.6] mb-6">
              Are you sure you want to cancel this registration? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 text-[0.8rem] font-medium py-2.5 text-[var(--col-secondary)] font-[family-name:var(--font-ui)] transition-colors duration-200 hover:text-[var(--col-primary)]"
                style={{
                  borderRadius: "14px",
                  background: "hsl(0 0% 100% / 0.5)",
                  border: "1px solid hsl(0 0% 85% / 0.4)",
                }}
              >
                Keep It
              </button>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="flex-1 text-[0.8rem] font-medium py-2.5 text-white text-center transition-all duration-200 cursor-pointer hover:opacity-90 font-[family-name:var(--font-ui)]"
                style={{ background: "hsl(0 65% 50%)" }}
                onClick={() => {
                  cancelRegistration(cancelId);
                  setCancelId(null);
                }}
              >
                Cancel Registration
              </Squircle>
            </div>
          </Squircle>
        </div>
      )}
    </div>
  );
}
