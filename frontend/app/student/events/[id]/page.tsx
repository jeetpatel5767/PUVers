"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate, formatDateTime } from "@/lib/utils";
import { MapPin, Clock, ArrowLeft, Ticket } from "lucide-react";

export default function StudentEventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const registrations = useDemoStore((s) => s.registrations);
  const registerForEvent = useDemoStore((s) => s.registerForEvent);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registered, setRegistered] = useState(false);

  const event = events.find((e) => e.id === id);
  const existingReg = registrations.find((r) => r.eventId === id && r.status !== "cancelled");

  if (!event) {
    return (
      <div className="py-20 text-center">
        <p className="text-[0.92rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-4">Event not found.</p>
        <Link href="/student/events" className="text-[var(--accent)] hover:text-[var(--accent-dark)] text-[0.84rem] font-medium font-[family-name:var(--font-ui)]">
          ← Back to events
        </Link>
      </div>
    );
  }

  const isFull = event.registered >= event.capacity;
  const spotsLeft = event.capacity - event.registered;
  const fillPercent = Math.round((event.registered / event.capacity) * 100);
  const isRegistered = !!existingReg || registered;

  const handleRegister = () => {
    registerForEvent(id);
    setRegistered(true);
    setShowConfirm(false);
  };

  const startD = new Date(event.startDate);
  const endD = new Date(event.endDate);
  const timeStart = startD.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: true });
  const timeEnd = endD.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: true });
  const dayName = startD.toLocaleDateString("en", { weekday: "long" });
  const monthName = startD.toLocaleDateString("en", { month: "long" });
  const dayNum = startD.getDate();
  const year = startD.getFullYear();

  return (
    <div>
      {/* Back link */}
      <Link
        href="/student/events"
        className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)] mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to events
      </Link>

      {/* Header area */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Squircle
            cornerRadius={8}
            cornerSmoothing={1}
            className="px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--accent)]"
            style={{ background: "hsl(25 65% 45% / 0.1)" }}
          >
            {event.category}
          </Squircle>
          {event.requiresApproval && (
            <Squircle
              cornerRadius={8}
              cornerSmoothing={1}
              className="px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--col-dim)]"
              style={{ background: "hsl(0 0% 90% / 0.5)" }}
            >
              Requires Approval
            </Squircle>
          )}
        </div>
        <h1 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          {event.title}
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
            {" "}.
          </span>
        </h1>
        <p className="mt-3 text-[0.88rem] text-[var(--col-secondary)] leading-[1.7] max-w-[600px] font-[family-name:var(--font-ui)]">
          {event.description}
        </p>
      </div>

      {/* Main grid — details left, registration right */}
      <div className="grid gap-5 lg:grid-cols-[1fr_0.45fr]">
        {/* Event details — visual blocks */}
        <div className="space-y-4">
          {/* Date + Time row */}
          <div className="grid grid-cols-[auto_1fr] gap-4">
            {/* Big date block */}
            <Squircle
              cornerRadius={28}
              cornerSmoothing={1}
              className="w-[140px] p-5 flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(145deg, var(--accent), hsl(25 55% 38%))",
                boxShadow: "0 4px 24px hsl(25 65% 45% / 0.3)",
              }}
            >
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/70 font-[family-name:var(--font-mono)]">
                {dayName}
              </p>
              <p className="text-[3rem] font-bold leading-none text-white font-[family-name:var(--font-mono)] my-1">
                {dayNum}
              </p>
              <p className="text-[0.78rem] font-medium text-white/90 font-[family-name:var(--font-display)]">
                {monthName} {year}
              </p>
            </Squircle>

            {/* Time + Venue stack */}
            <div className="space-y-3 flex flex-col">
              {/* Time block */}
              <Squircle
                cornerRadius={22}
                cornerSmoothing={1}
                className="p-5 flex-1 flex items-center"
                style={{
                  background: "hsl(0 0% 96% / 0.42)",
                  backdropFilter: "blur(24px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                  boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                }}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-[15px] h-[15px] text-[var(--accent)]" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[1.1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)]">
                      {timeStart}
                    </span>
                    <svg viewBox="0 0 24 6" className="w-6 h-[6px] flex-shrink-0">
                      <line x1="0" y1="3" x2="20" y2="3" stroke="var(--col-dim)" strokeWidth="1" strokeLinecap="round" />
                      <polygon points="18,0 24,3 18,6" fill="var(--col-dim)" />
                    </svg>
                    <span className="text-[1.1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)]">
                      {timeEnd}
                    </span>
                  </div>
                </div>
              </Squircle>

              {/* Venue block */}
              <Squircle
                cornerRadius={22}
                cornerSmoothing={1}
                className="p-5 flex-1 flex items-center"
                style={{
                  background: "hsl(0 0% 96% / 0.42)",
                  backdropFilter: "blur(24px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                  boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-[15px] h-[15px] text-[var(--accent)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                      Venue
                    </p>
                    <p className="text-[0.92rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mt-0.5">
                      {event.venue}
                    </p>
                  </div>
                </div>
              </Squircle>
            </div>
          </div>

          {/* Organizer row */}
          <Squircle
            cornerRadius={22}
            cornerSmoothing={1}
            className="p-5"
            style={{
              background: "hsl(0 0% 96% / 0.42)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            <div className="flex items-center gap-4">
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="w-12 h-12 flex items-center justify-center text-white text-[0.6rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}
              >
                {event.organization.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </Squircle>
              <div className="flex-1 min-w-0">
                <p className="text-[0.88rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                  {event.organization}
                </p>
                <p className="text-[0.74rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mt-0.5">
                  Organized by {event.organizer}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-[var(--col-primary)] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[var(--col-primary)] fill-none stroke-2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Squircle>
        </div>

        {/* Registration card */}
        <Squircle
          cornerRadius={28}
          cornerSmoothing={1}
          className="p-6 h-fit"
          style={{
            background: "hsl(0 0% 96% / 0.42)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6), inset 0 -1px 0 hsl(0 0% 80% / 0.1)",
          }}
        >
          <h2 className="text-[0.92rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-4">
            Registration
          </h2>

          {/* Spots counter */}
          <div className="flex items-end gap-1 mb-1">
            <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.03em] text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
              {event.registered}
            </span>
            <span className="text-[1rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-1">
              / {event.capacity}
            </span>
          </div>
          <p className="text-[0.7rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
            {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} remaining
          </p>

          {/* Progress bar */}
          <div className="h-[4px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden mb-6">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${fillPercent}%`,
                background: spotsLeft < 10 ? "var(--accent)" : "var(--col-primary)",
              }}
            />
          </div>

          {/* Action */}
          {isRegistered ? (
            <div>
              <Squircle
                cornerRadius={12}
                cornerSmoothing={1}
                className="w-full p-4 mb-3"
                style={{ background: "hsl(142 50% 45% / 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[hsl(142_50%_45%_/_0.15)] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[hsl(142,50%,35%)] fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.8rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                      You&apos;re registered
                    </p>
                    <p className="text-[0.68rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
                      {existingReg?.status === "waitlisted" ? "On waitlist" : "Confirmed"}
                    </p>
                  </div>
                </div>
              </Squircle>

              <Squircle
                cornerRadius={16}
                cornerSmoothing={1}
                className="group w-full inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] transition-all duration-300 hover:bg-[hsl(0_0%_96%_/_0.8)] font-[family-name:var(--font-display)] cursor-pointer"
                style={{
                  background: "hsl(0 0% 100% / 0.5)",
                  border: "1px solid hsl(0 0% 85% / 0.4)",
                }}
                asChild
              >
                <Link href="/student/tickets">
                  View Ticket
                  <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-[var(--col-primary)] flex items-center justify-center flex-shrink-0">
                    <Ticket className="w-[13px] h-[13px] text-[var(--col-primary)]" strokeWidth={1.5} />
                  </Squircle>
                </Link>
              </Squircle>
            </div>
          ) : event.status === "published" ? (
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              className="group w-full inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
              asChild
            >
              <button onClick={() => setShowConfirm(true)}>
                {isFull ? "Join Waitlist" : "Register Now"}
                <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Squircle>
              </button>
            </Squircle>
          ) : (
            <p className="text-[0.82rem] text-[var(--col-dim)] font-[family-name:var(--font-ui)]">
              Registration not available.
            </p>
          )}
        </Squircle>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in"
            onClick={() => setShowConfirm(false)}
          />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-7 animate-scale-in"
            style={{
              background: "hsl(0 0% 96% / 0.9)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-2">
              {isFull ? "Join Waitlist" : "Confirm Registration"}
            </h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] leading-[1.6] font-[family-name:var(--font-ui)] mb-6">
              {isFull
                ? `This event is full. You'll be added to the waitlist for "${event.title}".`
                : `Register for "${event.title}" on ${formatDate(event.startDate)}? A QR ticket will be issued immediately.`}
            </p>
            <div className="flex items-center gap-3">
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="flex-1 text-center text-[0.8rem] font-medium py-[11px] transition-all duration-300 hover:bg-[hsl(0_0%_92%)] font-[family-name:var(--font-display)] cursor-pointer text-[var(--col-secondary)]"
                style={{ background: "hsl(0 0% 100% / 0.5)", border: "1px solid hsl(0 0% 85% / 0.4)" }}
                asChild
              >
                <button onClick={() => setShowConfirm(false)}>Cancel</button>
              </Squircle>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="flex-1 text-center text-[0.8rem] font-medium py-[11px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                style={{ boxShadow: "0 2px 12px var(--shadow-lg)" }}
                asChild
              >
                <button onClick={handleRegister}>
                  {isFull ? "Join Waitlist" : "Confirm"}
                </button>
              </Squircle>
            </div>
          </Squircle>
        </div>
      )}
    </div>
  );
}
