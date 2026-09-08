"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Pencil,
  Image,
  Award,
  AlertCircle,
  CheckCircle2,
  UploadCloud,
  Send,
  Eye,
  Globe,
  FileCheck,
} from "lucide-react";

export default function AdminEventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const publishEvent = useDemoStore((s) => s.publishEvent);
  const resubmitEvent = useDemoStore((s) => s.resubmitEvent);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="py-20 text-center">
        <p className="text-[0.92rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-4">Event not found.</p>
        <Link href="/admin/events" className="text-[var(--accent)] hover:text-[var(--accent-dark)] text-[0.84rem] font-medium font-[family-name:var(--font-ui)]">
          &larr; Back to My Events
        </Link>
      </div>
    );
  }

  const normalizedStatus = event.status.toUpperCase();
  const fillPct = Math.round((event.registered / event.capacity) * 100);
  const spotsLeft = event.capacity - event.registered;
  const startD = new Date(event.startDate);
  const endD = new Date(event.endDate);
  const dayName = startD.toLocaleDateString("en", { weekday: "short" });
  const monthShort = startD.toLocaleDateString("en", { month: "short" });
  const dayNum = startD.getDate();
  const year = startD.getFullYear();

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-16">
      {/* Back link */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to My Events
        </Link>

        {/* Public Preview shortcut */}
        <Link
          href={`/student/events/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10 bg-white/60 text-[var(--col-primary)] hover:bg-white transition-all"
        >
          <Eye className="w-3.5 h-3.5 text-[var(--accent)]" />
          Preview Public Page
        </Link>
      </div>

      {/* ================= SCREEN 16: CHANGES REQUESTED BANNER ================= */}
      {normalizedStatus === "CHANGES_REQUESTED" && (
        <div className="mb-6 p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                Screen 16 — Event Admin Status Details: Changes Requested
              </h3>
            </div>
            <span className="text-[0.68rem] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 font-bold">
              STATUS: CHANGES_REQUESTED
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-amber-500/20 space-y-1">
            <p className="text-[0.65rem] uppercase tracking-wider font-mono text-amber-800 font-bold">Super Admin Remarks</p>
            <p className="text-sm font-medium text-[var(--col-primary)] leading-relaxed">
              &ldquo;{event.superAdminRemarks || "Please review session titles and venue safety before resubmitting."}&rdquo;
            </p>
            {event.submittedAt && (
              <p className="text-[0.68rem] text-[var(--col-dim)] font-mono pt-1">
                Submitted on: {formatDate(event.submittedAt)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => resubmitEvent(event.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Resubmit for Approval
            </button>
            <Link
              href="/admin/events/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-500/30 text-amber-900 text-xs font-semibold hover:bg-amber-50 transition-all"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Event
            </Link>
          </div>
        </div>
      )}

      {/* ================= SCREEN 17: APPROVED EVENT / PUBLISH BANNER ================= */}
      {normalizedStatus === "APPROVED" && (
        <div className="mb-6 p-6 rounded-2xl bg-blue-500/10 border-2 border-blue-500/30 text-blue-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                Screen 17 — Approved Event: Ready to Publish
              </h3>
            </div>
            <span className="text-[0.68rem] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-800 font-bold">
              STATUS: APPROVED
            </span>
          </div>

          <p className="text-xs text-blue-800">
            Super Admin has approved this event! You can now publish it to the university public event portal so students can register.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => publishEvent(event.id)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--col-primary)] hover:opacity-85 text-white font-bold text-xs shadow-md transition-all font-[family-name:var(--font-display)]"
            >
              <UploadCloud className="w-4 h-4" />
              Publish Event Now
            </button>
            <Link
              href={`/student/events/${id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-blue-500/20 text-blue-900 text-xs font-semibold hover:bg-blue-50 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Public Page
            </Link>
          </div>
        </div>
      )}

      {/* PUBLISHED LIVE BANNER */}
      {normalizedStatus === "PUBLISHED" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-semibold">
              Event is currently <span className="font-bold">LIVE & PUBLISHED</span>. Students can discover and register for it.
            </p>
          </div>
          <Link
            href={`/student/events/${id}`}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
          >
            View Live Public Page &rarr;
          </Link>
        </div>
      )}

      {/* PENDING APPROVAL BANNER */}
      {normalizedStatus === "PENDING_APPROVAL" && (
        <div className="mb-6 p-4 rounded-xl bg-black/5 border border-black/10 flex items-center justify-between text-[var(--col-secondary)] text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Submitted for Super Admin approval. Changes cannot be made while in review.</span>
          </div>
          <span className="font-mono font-bold text-[0.68rem] px-2 py-0.5 rounded bg-black/5">
            PENDING_APPROVAL
          </span>
        </div>
      )}

      {/* Hero Banner */}
      {event.bannerUrl ? (
        <Squircle cornerRadius={28} cornerSmoothing={1} className="w-full h-[240px] mb-6 overflow-hidden relative">
          <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-xs font-semibold">
            {event.eventMode || "Offline"} Mode
          </div>
        </Squircle>
      ) : (
        <Squircle
          cornerRadius={28}
          cornerSmoothing={1}
          className="w-full h-[200px] mb-6 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(0 0% 88%) 0%, hsl(0 0% 82%) 100%)" }}
        >
          <div className="flex flex-col items-center gap-2 opacity-40">
            <Image className="w-10 h-10 text-[var(--col-secondary)]" strokeWidth={1} />
            <p className="text-[0.72rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">No banner uploaded</p>
          </div>
        </Squircle>
      )}

      {/* Title + Metadata */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Squircle
            cornerRadius={8}
            cornerSmoothing={1}
            className="px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--accent)]"
            style={{ background: "hsl(25 65% 45% / 0.1)" }}
          >
            {event.eventCategory || event.category}
          </Squircle>
          <span className="text-xs text-[var(--col-dim)] font-mono">
            Organized by: <strong className="text-[var(--col-primary)]">{event.organizer}</strong> &middot; {event.organization}
          </span>
        </div>
        <h1 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          {event.title}
        </h1>
        <p className="mt-2.5 text-[0.86rem] text-[var(--col-secondary)] leading-[1.7] max-w-[680px] font-[family-name:var(--font-ui)]">
          {event.description}
        </p>
      </div>

      {/* Key Info Strip */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Squircle cornerRadius={16} cornerSmoothing={1} className="flex items-center gap-3 px-4 py-3" style={glassStyle}>
          <div className="w-9 h-9 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-[14px] h-[14px] text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Date</p>
            <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              {dayName}, {monthShort} {dayNum}, {year}
            </p>
          </div>
        </Squircle>

        <Squircle cornerRadius={16} cornerSmoothing={1} className="flex items-center gap-3 px-4 py-3" style={glassStyle}>
          <div className="w-9 h-9 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <Clock className="w-[14px] h-[14px] text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Time</p>
            <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              {event.startTime || "09:00 AM"} &mdash; {event.endTime || "05:00 PM"}
            </p>
          </div>
        </Squircle>

        <Squircle cornerRadius={16} cornerSmoothing={1} className="flex items-center gap-3 px-4 py-3" style={glassStyle}>
          <div className="w-9 h-9 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-[14px] h-[14px] text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Venue</p>
            <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              {event.venue}
            </p>
          </div>
        </Squircle>

        <Squircle cornerRadius={16} cornerSmoothing={1} className="flex items-center gap-3 px-4 py-3" style={glassStyle}>
          <div className="w-9 h-9 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <Users className="w-[14px] h-[14px] text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Registrations</p>
            <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              {event.registered} / {event.capacity}
            </p>
          </div>
        </Squircle>
      </div>

      {/* 2-Column: Left (About, Agenda, Speakers, Sponsors, Form), Right (Stats & Settings) */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="space-y-6">
          {/* About */}
          {event.about && (
            <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
              <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-3">About the Event</h3>
              <p className="text-sm text-[var(--col-secondary)] leading-relaxed">{event.about}</p>
            </Squircle>
          )}

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
              <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-4">
                Agenda ({event.agenda.length} Sessions)
              </h3>
              <div className="space-y-3">
                {event.agenda.map((ag, i) => (
                  <div key={i} className="flex gap-4 items-start p-3 rounded-xl bg-white/60">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] whitespace-nowrap">{ag.time}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--col-primary)]">{ag.sessionTitle}</p>
                      {ag.description && <p className="text-xs text-[var(--col-secondary)] mt-0.5">{ag.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Squircle>
          )}

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
              <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-4">
                Speakers ({event.speakers.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {event.speakers.map((sp, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/60">
                    <p className="text-sm font-bold text-[var(--col-primary)]">{sp.name}</p>
                    <p className="text-xs text-[var(--accent)] font-medium">{sp.designation} &middot; {sp.organization}</p>
                    {sp.bio && <p className="text-xs text-[var(--col-secondary)] mt-1 line-clamp-2">{sp.bio}</p>}
                  </div>
                ))}
              </div>
            </Squircle>
          )}

          {/* Sponsors */}
          {event.sponsors && event.sponsors.length > 0 && (
            <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
              <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-4">
                Sponsors & Partners ({event.sponsors.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {event.sponsors.map((spo, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/60 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[var(--col-primary)]">{spo.name}</p>
                      <p className="text-xs text-[var(--col-secondary)]">{spo.description || "Official Sponsor"}</p>
                    </div>
                    <span className="text-[0.62rem] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 font-bold uppercase">
                      {spo.sponsorshipLevel}
                    </span>
                  </div>
                ))}
              </div>
            </Squircle>
          )}

          {/* Registration Form configured fields */}
          {event.registrationFields && event.registrationFields.length > 0 && (
            <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
              <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-4">
                Configured Registration Fields ({event.registrationFields.length})
              </h3>
              <div className="space-y-2">
                {event.registrationFields.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--col-primary)]">{f.label}</span>
                    <div className="flex items-center gap-2 font-mono text-[0.65rem]">
                      <span className="px-1.5 py-0.5 rounded bg-black/5 text-[var(--col-dim)]">[{f.fieldType}]</span>
                      {f.required ? (
                        <span className="text-red-600 font-bold">Required</span>
                      ) : (
                        <span className="text-[var(--col-dim)]">Optional</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Squircle>
          )}
        </div>

        {/* Right Sidebar: Capacity & Admin info */}
        <div className="space-y-4">
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-3">Capacity & Attendance</h3>
            <div className="flex items-end gap-1.5 mb-2">
              <span className="text-3xl font-bold font-mono text-[var(--col-primary)]">{event.registered}</span>
              <span className="text-sm text-[var(--col-dim)] font-mono mb-1">/ {event.capacity} spots</span>
            </div>
            <div className="h-2 rounded-full bg-black/5 overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-[var(--col-primary)]"
                style={{ width: `${Math.min(100, fillPct)}%` }}
              />
            </div>
            <p className="text-xs text-[var(--col-dim)] font-mono">
              {spotsLeft > 0 ? `${spotsLeft} spots available` : "Full capacity reached"}
            </p>
          </Squircle>

          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--col-dim)] mb-3">Event Lifecycle</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--col-dim)]">Status:</span>
                <span className="font-bold text-[var(--col-primary)]">{event.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--col-dim)]">Mode:</span>
                <span className="text-[var(--col-primary)]">{event.eventMode || "Offline"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--col-dim)]">Requires Approval:</span>
                <span className="text-[var(--col-primary)]">Yes</span>
              </div>
              {event.submittedAt && (
                <div className="flex justify-between">
                  <span className="text-[var(--col-dim)]">Submitted:</span>
                  <span className="text-[var(--col-primary)]">{formatDate(event.submittedAt)}</span>
                </div>
              )}
            </div>
          </Squircle>
        </div>
      </div>
    </div>
  );
}
