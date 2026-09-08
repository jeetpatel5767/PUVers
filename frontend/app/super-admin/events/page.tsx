"use client";

import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarDays,
  MapPin,
  Search,
  MessageSquare,
  Eye,
  AlertCircle,
  X,
  Send,
  Users,
  Check,
} from "lucide-react";

export default function SuperAdminEventApprovalsPage() {
  const events = useDemoStore((s) => s.events);
  const approveEvent = useDemoStore((s) => s.approveEvent);
  const requestChanges = useDemoStore((s) => s.requestChanges);
  const rejectEvent = useDemoStore((s) => s.rejectEvent);

  const [search, setSearch] = useState("");
  const [reviewEvent, setReviewEvent] = useState<Event | null>(null);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState<Event | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<Event | null>(null);
  const [remarks, setRemarks] = useState("");
  const [showToast, setShowToast] = useState("");

  const pendingEvents = events.filter((e) => e.status.toUpperCase() === "PENDING_APPROVAL");
  const otherEvents = events.filter((e) => e.status.toUpperCase() !== "PENDING_APPROVAL" && e.status.toUpperCase() !== "DRAFT");

  const filteredPending = pendingEvents.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q) || e.organization.toLowerCase().includes(q);
  });

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const handleApprove = (e: Event) => {
    approveEvent(e.id);
    setReviewEvent(null);
    setShowToast(`Approved "${e.title}". Event Admin can now publish.`);
  };

  const handleSendRequestChanges = () => {
    if (!showRequestChangesModal) return;
    requestChanges(showRequestChangesModal.id, remarks || "Please refine the event schedule and speaker information.");
    setShowToast(`Requested changes for "${showRequestChangesModal.title}".`);
    setShowRequestChangesModal(null);
    setReviewEvent(null);
    setRemarks("");
  };

  const handleReject = () => {
    if (!showRejectModal) return;
    rejectEvent(showRejectModal.id, remarks || "Event proposal declined as per university policy.");
    setShowToast(`Rejected "${showRejectModal.title}".`);
    setShowRejectModal(null);
    setReviewEvent(null);
    setRemarks("");
  };

  return (
    <div>
      {/* Header (Screen 13) */}
      <div className="mb-6">
        <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-2 font-[family-name:var(--font-mono)]">
          <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
          Screen 13 — Super Admin Pending Approvals
        </p>
        <h1 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          Event Approvals & Moderation
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
        </h1>
        <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
          Review submissions and decide: Approve &rarr; Approved, Request Changes &rarr; Changes Requested, or Reject.
        </p>
      </div>

      {/* Pending Count Banner */}
      <div className="grid gap-4 sm:grid-cols-3 mb-7">
        <Squircle cornerRadius={18} cornerSmoothing={1} className="p-4 flex items-center justify-between" style={{ ...glassStyle, border: "1px solid hsl(45 90% 50% / 0.2)" }}>
          <div>
            <p className="text-[0.65rem] uppercase font-mono text-[var(--col-dim)] tracking-wider">Pending Approvals</p>
            <p className="text-2xl font-bold font-mono text-amber-700 mt-0.5">{pendingEvents.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
        </Squircle>

        <Squircle cornerRadius={18} cornerSmoothing={1} className="p-4 flex items-center justify-between" style={glassStyle}>
          <div>
            <p className="text-[0.65rem] uppercase font-mono text-[var(--col-dim)] tracking-wider">Changes Requested</p>
            <p className="text-2xl font-bold font-mono text-orange-600 mt-0.5">
              {events.filter((e) => e.status.toUpperCase() === "CHANGES_REQUESTED").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
        </Squircle>

        <Squircle cornerRadius={18} cornerSmoothing={1} className="p-4 flex items-center justify-between" style={glassStyle}>
          <div>
            <p className="text-[0.65rem] uppercase font-mono text-[var(--col-dim)] tracking-wider">Total Reviewed</p>
            <p className="text-2xl font-bold font-mono text-[var(--col-primary)] mt-0.5">{otherEvents.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </Squircle>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--col-dim)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter pending submissions by title or organizer..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-black/10 text-xs text-[var(--col-primary)] outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Screen 13: Pending Submissions Table */}
      <section className="mb-10">
        <h2 className="text-xs uppercase font-mono tracking-wider text-[var(--col-dim)] font-bold mb-3">
          Submissions Awaiting Approval ({filteredPending.length})
        </h2>

        {filteredPending.length === 0 ? (
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-12 text-center" style={glassStyle}>
            <CheckCircle2 className="w-8 h-8 text-[var(--positive)] mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-[var(--col-primary)]">All Clear</p>
            <p className="text-xs text-[var(--col-secondary)] mt-1">No pending event submissions requiring review.</p>
          </Squircle>
        ) : (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="overflow-hidden" style={glassStyle}>
            <div
              className="grid items-center gap-4 px-6 py-3.5"
              style={{
                gridTemplateColumns: "1.2fr 140px 120px 140px 110px",
                borderBottom: "1px solid hsl(0 0% 85% / 0.3)",
              }}
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Event Title</span>
              <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Submitted By</span>
              <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Submitted Date</span>
              <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Status</span>
              <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono text-right">Review</span>
            </div>

            {filteredPending.map((event, idx) => (
              <div
                key={event.id}
                className="grid items-center gap-4 px-6 py-4 hover:bg-white/30 transition-colors"
                style={{
                  gridTemplateColumns: "1.2fr 140px 120px 140px 110px",
                  borderBottom: idx < filteredPending.length - 1 ? "1px solid hsl(0 0% 88% / 0.3)" : undefined,
                }}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--col-primary)] truncate">{event.title}</p>
                  <p className="text-xs text-[var(--col-dim)] mt-0.5">{event.venue} &middot; Cap: {event.capacity}</p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[var(--col-primary)] truncate">{event.organizer}</p>
                  <p className="text-[0.68rem] text-[var(--col-dim)] truncate">{event.organization}</p>
                </div>

                <div className="text-xs font-mono text-[var(--col-secondary)]">
                  {event.submittedAt ? formatDate(event.submittedAt) : formatDate(event.startDate)}
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.62rem] font-bold font-mono bg-amber-500/15 text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    PENDING_APPROVAL
                  </span>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setReviewEvent(event)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--col-primary)] text-white text-xs font-semibold hover:opacity-85 transition-all shadow-sm font-[family-name:var(--font-display)]"
                  >
                    <Eye className="w-3 h-3" />
                    Review
                  </button>
                </div>
              </div>
            ))}
          </Squircle>
        )}
      </section>

      {/* Historical / Reviewed Events */}
      <section>
        <h2 className="text-xs uppercase font-mono tracking-wider text-[var(--col-dim)] font-bold mb-3">
          Reviewed & Published Events
        </h2>
        <Squircle cornerRadius={24} cornerSmoothing={1} className="overflow-hidden" style={glassStyle}>
          <div
            className="grid items-center gap-4 px-6 py-3.5"
            style={{
              gridTemplateColumns: "1.2fr 140px 110px 140px",
              borderBottom: "1px solid hsl(0 0% 85% / 0.3)",
            }}
          >
            <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Event Title</span>
            <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Organization</span>
            <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Date</span>
            <span className="text-[0.6rem] uppercase tracking-wider text-[var(--col-dim)] font-mono">Current Status</span>
          </div>

          {otherEvents.map((evt, idx) => (
            <div
              key={evt.id}
              className="grid items-center gap-4 px-6 py-3.5 text-xs hover:bg-white/20 transition-colors"
              style={{
                gridTemplateColumns: "1.2fr 140px 110px 140px",
                borderBottom: idx < otherEvents.length - 1 ? "1px solid hsl(0 0% 88% / 0.2)" : undefined,
              }}
            >
              <p className="font-semibold text-[var(--col-primary)] truncate">{evt.title}</p>
              <p className="text-[var(--col-secondary)] truncate">{evt.organization}</p>
              <p className="text-[var(--col-dim)] font-mono">{formatDate(evt.startDate)}</p>
              <div>
                <span className="px-2 py-0.5 rounded text-[0.62rem] font-bold font-mono bg-black/5 text-[var(--col-dim)]">
                  {evt.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </Squircle>
      </section>

      {/* ================= SCREEN 14: SUPER ADMIN REVIEW EVENT MODAL ================= */}
      {reviewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setReviewEvent(null)}
          />
          <Squircle
            cornerRadius={28}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7 animate-scale-in space-y-6"
            style={{
              background: "hsl(0 0% 96% / 0.98)",
              backdropFilter: "blur(30px)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-black/10 pb-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-wider font-mono text-[var(--col-dim)]">
                  Screen 14 — Super Admin Review Event
                </p>
                <h3 className="text-xl font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                  {reviewEvent.title}
                </h3>
                <p className="text-xs text-[var(--col-secondary)] mt-0.5">
                  Submitted by <strong>{reviewEvent.organizer}</strong> &middot; {reviewEvent.organization}
                </p>
              </div>
              <button
                onClick={() => setReviewEvent(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-[var(--col-secondary)]" />
              </button>
            </div>

            {/* Basic Info Summary */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/80 space-y-2">
                <p className="font-bold text-[var(--col-primary)] uppercase tracking-wider text-[0.68rem] font-mono">
                  1. Basic Details
                </p>
                <p className="text-[var(--col-secondary)] leading-relaxed">{reviewEvent.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[var(--col-dim)] font-mono">
                  <p>Category: <strong className="text-[var(--col-primary)]">{reviewEvent.eventCategory || reviewEvent.category}</strong></p>
                  <p>Mode: <strong className="text-[var(--col-primary)]">{reviewEvent.eventMode || "Offline"}</strong></p>
                  <p>Schedule: <strong className="text-[var(--col-primary)]">{reviewEvent.startDate} &middot; {reviewEvent.startTime || "09:00 AM"}</strong></p>
                  <p>Venue: <strong className="text-[var(--col-primary)]">{reviewEvent.venue}</strong></p>
                  <p>Capacity: <strong className="text-[var(--col-primary)]">{reviewEvent.capacity} attendees</strong></p>
                </div>
              </div>

              {/* Agenda summary */}
              {reviewEvent.agenda && reviewEvent.agenda.length > 0 && (
                <div className="p-4 rounded-xl bg-white/80 space-y-2">
                  <p className="font-bold text-[var(--col-primary)] uppercase tracking-wider text-[0.68rem] font-mono">
                    2. Agenda ({reviewEvent.agenda.length} sessions)
                  </p>
                  <div className="space-y-1.5">
                    {reviewEvent.agenda.map((ag, i) => (
                      <div key={i} className="flex gap-2 items-baseline">
                        <span className="font-mono text-[var(--accent)] font-semibold">{ag.time}</span>
                        <span className="font-medium text-[var(--col-primary)]">{ag.sessionTitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers summary */}
              {reviewEvent.speakers && reviewEvent.speakers.length > 0 && (
                <div className="p-4 rounded-xl bg-white/80 space-y-2">
                  <p className="font-bold text-[var(--col-primary)] uppercase tracking-wider text-[0.68rem] font-mono">
                    3. Speakers ({reviewEvent.speakers.length})
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {reviewEvent.speakers.map((sp, i) => (
                      <div key={i} className="p-2 rounded-lg bg-black/5">
                        <p className="font-bold text-[var(--col-primary)]">{sp.name}</p>
                        <p className="text-[0.65rem] text-[var(--col-dim)]">{sp.designation} &middot; {sp.organization}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors summary */}
              {reviewEvent.sponsors && reviewEvent.sponsors.length > 0 && (
                <div className="p-4 rounded-xl bg-white/80 space-y-2">
                  <p className="font-bold text-[var(--col-primary)] uppercase tracking-wider text-[0.68rem] font-mono">
                    4. Sponsors ({reviewEvent.sponsors.length})
                  </p>
                  <p className="text-[var(--col-secondary)]">
                    {reviewEvent.sponsors.map((s) => `${s.name} (${s.sponsorshipLevel || "Sponsor"})`).join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Decision Actions (Approve / Request Changes / Reject) */}
            <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowRejectModal(reviewEvent)}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 font-semibold text-xs transition-all"
              >
                Reject Event
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRequestChangesModal(reviewEvent)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Request Changes
                </button>

                <Squircle
                  cornerRadius={14}
                  cornerSmoothing={1}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[hsl(142,50%,35%)] hover:bg-[hsl(142,50%,30%)] text-white font-bold text-xs shadow-md transition-all cursor-pointer font-[family-name:var(--font-display)]"
                  asChild
                >
                  <button onClick={() => handleApprove(reviewEvent)}>
                    <Check className="w-4 h-4" />
                    Approve Event
                  </button>
                </Squircle>
              </div>
            </div>
          </Squircle>
        </div>
      )}

      {/* ================= SCREEN 15: REQUEST CHANGES MODAL ================= */}
      {showRequestChangesModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowRequestChangesModal(null)}
          />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-md p-7 animate-scale-in space-y-4"
            style={{
              background: "hsl(0 0% 96% / 0.98)",
              backdropFilter: "blur(30px)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.3)",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-wider font-mono text-[var(--col-dim)]">
              Screen 15 — Request Changes
            </p>
            <h3 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              Request Changes from Organizer
            </h3>
            <p className="text-xs text-[var(--col-secondary)]">
              Specify the revisions required for <strong>&ldquo;{showRequestChangesModal.title}&rdquo;</strong>. The Event Admin will receive these remarks to edit and resubmit.
            </p>

            <div>
              <label className="block text-[0.66rem] uppercase tracking-wider font-mono text-[var(--col-dim)] mb-1.5 font-bold">
                Remarks / Required Changes *
              </label>
              <textarea
                rows={4}
                required
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Please verify hardware lab permissions, confirm the keynote speaker time, and refine session descriptions..."
                className="w-full p-3 text-xs bg-white border border-black/10 rounded-xl outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRequestChangesModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-black/5 text-[var(--col-secondary)] hover:bg-black/10"
              >
                Cancel
              </button>
              <Squircle
                cornerRadius={12}
                cornerSmoothing={1}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs cursor-pointer shadow-md"
                asChild
              >
                <button onClick={handleSendRequestChanges}>
                  <Send className="w-3.5 h-3.5" />
                  Send Request Changes
                </button>
              </Squircle>
            </div>
          </Squircle>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowRejectModal(null)}
          />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-md p-7 animate-scale-in space-y-4"
            style={{ background: "hsl(0 0% 96% / 0.98)", backdropFilter: "blur(30px)" }}
          >
            <h3 className="text-lg font-bold text-red-600 font-[family-name:var(--font-display)]">
              Reject Event Proposal
            </h3>
            <p className="text-xs text-[var(--col-secondary)]">
              Provide reason for rejecting &ldquo;{showRejectModal.title}&rdquo;. The event will remain recorded as REJECTED in history.
            </p>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Reason for rejection (e.g. Schedule conflicts with semester examinations)..."
              className="w-full p-3 text-xs bg-white border border-black/10 rounded-xl outline-none"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRejectModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-black/5 text-[var(--col-secondary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </Squircle>
        </div>
      )}

      {/* Success Notification Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[var(--col-primary)] text-white text-xs font-semibold shadow-xl flex items-center gap-2.5 animate-scale-in">
          <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
          <span>{showToast}</span>
          <button onClick={() => setShowToast("")} className="ml-2 text-white/60 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
