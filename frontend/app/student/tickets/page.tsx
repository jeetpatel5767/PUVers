"use client";

import { useState } from "react";
import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import { Ticket, MapPin, Clock, Maximize2 } from "lucide-react";
import type { Ticket as TicketType } from "@/types";

function QRBlock({ code, size = 140 }: { code: string; size?: number }) {
  const cells = 11;
  const hash = code.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const grid = Array.from({ length: cells }, (_, row) =>
    Array.from({ length: cells }, (_, col) => {
      const isCorner =
        (row < 3 && col < 3) ||
        (row < 3 && col >= cells - 3) ||
        (row >= cells - 3 && col < 3);
      const isPattern = (row * 7 + col * 13 + hash) % 3 === 0;
      return isCorner || isPattern;
    }),
  );
  const cellSize = size / cells;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: 10 }}>
      <rect width={size} height={size} fill="white" rx="10" />
      {grid.map((row, ri) =>
        row.map((filled, ci) =>
          filled ? (
            <rect
              key={`${ri}-${ci}`}
              x={ci * cellSize}
              y={ri * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1A1A1A"
              rx="1"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

export default function StudentTicketsPage() {
  const tickets = useDemoStore((s) => s.tickets);
  const events = useDemoStore((s) => s.events);
  const [selected, setSelected] = useState<TicketType | null>(null);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-4 font-[family-name:var(--font-mono)]">
          <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
          Tickets
        </p>
        <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          My Tickets
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
            {" "}.
          </span>
        </h1>
        <p className="mt-2 text-[0.88rem] text-[var(--col-secondary)] leading-[1.6] font-[family-name:var(--font-ui)]">
          Show your QR ticket at the venue for check-in.
        </p>
      </div>

      {tickets.length === 0 ? (
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
            <Ticket className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <p className="text-[0.92rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">
            No tickets yet
          </p>
          <p className="text-[0.78rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-5">
            Register for an event to receive a QR ticket.
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
        <div className="space-y-5">
          {tickets.map((ticket) => {
            const event = events.find((e) => e.id === ticket.eventId);
            const isActive = ticket.status === "active";
            const d = event ? new Date(event.startDate) : null;
            const dayNum = d?.getDate();
            const monthShort = d?.toLocaleDateString("en-US", { month: "short" });
            const dayName = d?.toLocaleDateString("en-US", { weekday: "short" });
            const timeStr = d?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

            return (
              <Squircle
                key={ticket.id}
                cornerRadius={28}
                cornerSmoothing={1}
                className="overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "hsl(0 0% 96% / 0.42)",
                  backdropFilter: "blur(24px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                  boxShadow: "0 2px 24px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6), inset 0 -1px 0 hsl(0 0% 80% / 0.1)",
                }}
              >
                {/* Horizontal ticket stub layout */}
                <div className="flex min-h-[200px]">
                  {/* Left — event info */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Status + ticket icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(25 65% 45% / 0.1)" }}>
                        <Ticket className="w-3.5 h-3.5 text-[var(--accent)]" />
                      </div>
                      <span
                        className="text-[0.56rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] px-2.5 py-1"
                        style={{
                          borderRadius: "20px",
                          background: isActive ? "hsl(142 50% 45% / 0.08)" : "hsl(0 0% 50% / 0.08)",
                          color: isActive ? "hsl(142 50% 35%)" : "var(--col-dim)",
                          border: `1px solid ${isActive ? "hsl(142 50% 45% / 0.15)" : "hsl(0 0% 70% / 0.2)"}`,
                        }}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[1.1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] leading-[1.25] mb-3">
                      {ticket.eventTitle}
                    </h3>

                    {/* Date + venue row */}
                    <div className="flex items-center gap-4 mt-auto">
                      {d && (
                        <div className="flex items-center gap-2.5">
                          <Squircle
                            cornerRadius={12}
                            cornerSmoothing={1}
                            className="w-[52px] h-[52px] flex flex-col items-center justify-center flex-shrink-0"
                            style={{
                              background: "linear-gradient(145deg, var(--accent), hsl(25 75% 35%))",
                              boxShadow: "0 3px 12px hsl(25 65% 45% / 0.3)",
                            }}
                          >
                            <span className="text-[1.1rem] font-bold text-white leading-none font-[family-name:var(--font-mono)]">
                              {dayNum}
                            </span>
                            <span className="text-[0.5rem] uppercase tracking-[0.08em] text-white/75 font-[family-name:var(--font-mono)]">
                              {monthShort}
                            </span>
                          </Squircle>
                          <div>
                            <p className="text-[0.76rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                              {dayName}, {timeStr}
                            </p>
                            {event?.venue && (
                              <p className="text-[0.68rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] flex items-center gap-1 mt-0.5">
                                <MapPin className="w-[10px] h-[10px] text-[var(--col-dim)]" />
                                {event.venue}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vertical tear line */}
                  <div className="relative w-0 flex-shrink-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: "var(--bg)" }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-5 rounded-full" style={{ background: "var(--bg)" }} />
                    <div className="absolute top-5 bottom-5 left-1/2 -translate-x-1/2 w-px" style={{ backgroundImage: "repeating-linear-gradient(180deg, hsl(0 0% 75% / 0.4) 0px, hsl(0 0% 75% / 0.4) 4px, transparent 4px, transparent 8px)" }} />
                  </div>

                  {/* Right — QR stub */}
                  <div className="w-[200px] flex-shrink-0 p-6 flex flex-col items-center justify-center">
                    <div style={{ opacity: isActive ? 1 : 0.3 }}>
                      <QRBlock code={ticket.ticketCode} size={110} />
                    </div>
                    <p className="text-[0.6rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tracking-[0.06em] mt-2.5 text-center">
                      {ticket.ticketCode}
                    </p>
                    <button
                      onClick={() => setSelected(ticket)}
                      className="mt-3 group/btn"
                    >
                      <Squircle
                        cornerRadius={10}
                        cornerSmoothing={1}
                        className="inline-flex items-center gap-1.5 text-[0.66rem] font-medium px-3 py-[5px] transition-all duration-200 font-[family-name:var(--font-ui)]"
                        style={{
                          background: "var(--col-primary)",
                          color: "var(--bg)",
                        }}
                      >
                        <Maximize2 className="w-2.5 h-2.5" />
                        Expand
                      </Squircle>
                    </button>
                  </div>
                </div>
              </Squircle>
            );
          })}
        </div>
      )}

      {/* Full ticket modal */}
      {selected && (() => {
        const event = events.find((e) => e.id === selected.eventId);
        const d = event ? new Date(event.startDate) : null;
        const dayNum = d?.getDate();
        const monthShort = d?.toLocaleDateString("en-US", { month: "short" });
        const timeStr = d?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

        return (
          <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{ background: "hsl(0 0% 0% / 0.35)", backdropFilter: "blur(10px)" }}
              onClick={() => setSelected(null)}
            />
            <Squircle
              cornerRadius={32}
              cornerSmoothing={1}
              className="relative z-10 w-full max-w-[360px] mx-4 overflow-hidden"
              style={{
                background: "hsl(0 0% 96% / 0.9)",
                backdropFilter: "blur(40px) saturate(1.6)",
                WebkitBackdropFilter: "blur(40px) saturate(1.6)",
                boxShadow: "0 24px 80px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
              }}
            >
              {/* Accent strip at top */}
              <div className="h-[4px]" style={{ background: "linear-gradient(90deg, var(--accent), hsl(25 75% 55%))" }} />

              {/* Header */}
              <div className="p-6 pb-4 text-center">
                <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "hsl(25 65% 45% / 0.1)" }}>
                  <Ticket className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <h3 className="text-[1.05rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] leading-[1.3] mb-2">
                  {selected.eventTitle}
                </h3>
                {event && (
                  <div className="inline-flex items-center gap-2.5 text-[0.74rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[var(--accent)]" />
                      {formatDate(event.startDate)} · {timeStr}
                    </span>
                  </div>
                )}
                {event?.venue && (
                  <p className="text-[0.7rem] text-[var(--col-dim)] font-[family-name:var(--font-ui)] mt-1.5 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--accent)]" />
                    {event.venue}
                  </p>
                )}
              </div>

              {/* Tear line */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full" style={{ background: "var(--bg)" }} />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full" style={{ background: "var(--bg)" }} />
                <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 h-px" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(0 0% 75% / 0.4) 0px, hsl(0 0% 75% / 0.4) 4px, transparent 4px, transparent 8px)" }} />
                <div className="h-5" />
              </div>

              {/* QR section */}
              <div className="px-6 pb-6 flex flex-col items-center">
                <div className="mb-3" style={{ opacity: selected.status === "active" ? 1 : 0.35 }}>
                  <QRBlock code={selected.ticketCode} size={180} />
                </div>
                <p className="text-[0.82rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tracking-[0.06em] mb-1">
                  {selected.ticketCode}
                </p>
                <p className="text-[0.68rem] text-[var(--col-dim)] font-[family-name:var(--font-ui)] mb-5">
                  Show this QR code at the venue entrance
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[0.78rem] font-medium py-2 px-6 text-[var(--col-secondary)] font-[family-name:var(--font-ui)] transition-colors duration-200 hover:text-[var(--col-primary)]"
                  style={{
                    borderRadius: "14px",
                    background: "hsl(0 0% 100% / 0.5)",
                    border: "1px solid hsl(0 0% 85% / 0.4)",
                  }}
                >
                  Close
                </button>
              </div>
            </Squircle>
          </div>
        );
      })()}
    </div>
  );
}
