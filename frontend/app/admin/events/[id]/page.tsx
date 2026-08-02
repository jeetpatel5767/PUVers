"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
  Mail,
  ClipboardList,
  ScanLine,
  UserCog,
} from "lucide-react";

export default function AdminEventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="py-20 text-center">
        <p className="text-[0.92rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-4">Event not found.</p>
        <Link href="/admin/events" className="text-[var(--accent)] hover:text-[var(--accent-dark)] text-[0.84rem] font-medium font-[family-name:var(--font-ui)]">
          &larr; Back to events
        </Link>
      </div>
    );
  }

  const fillPct = Math.round((event.registered / event.capacity) * 100);
  const spotsLeft = event.capacity - event.registered;
  const startD = new Date(event.startDate);
  const endD = new Date(event.endDate);
  const fmt = (d: Date) => d.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: true });
  const dayName = startD.toLocaleDateString("en", { weekday: "short" });
  const monthShort = startD.toLocaleDateString("en", { month: "short" });
  const dayNum = startD.getDate();
  const year = startD.getFullYear();

  const statusDot: Record<string, string> = {
    published: "var(--positive)", pending_approval: "var(--warning)",
    completed: "var(--col-dim)", cancelled: "var(--danger)", draft: "var(--col-secondary)",
  };
  const statusLabel: Record<string, string> = {
    published: "Published", pending_approval: "Pending Approval",
    completed: "Completed", cancelled: "Cancelled", draft: "Draft",
  };

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const managementLinks = [
    { label: "Registrations", desc: "View & export attendees", href: `/admin/events/${id}/registrations`, icon: ClipboardList },
    { label: "Attendance", desc: "QR scanner & check-ins", href: `/admin/events/${id}/attendance`, icon: ScanLine },
    { label: "Event Staff", desc: "Assign scanners & coordinators", href: `/admin/events/${id}/staff`, icon: UserCog },
  ];

  return (
    <div>
      {/* Back + Edit header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to events
        </Link>
        <Link href={`/admin/events/${id}/edit`}>
          <Squircle
            cornerRadius={14}
            cornerSmoothing={1}
            className="group inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.04em] pl-4 pr-[4px] py-[4px] transition-all duration-300 hover:bg-[hsl(0_0%_96%_/_0.8)] font-[family-name:var(--font-display)] cursor-pointer"
            style={{ background: "hsl(0 0% 100% / 0.5)", border: "1px solid hsl(0 0% 85% / 0.4)" }}
          >
            Edit Event
            <Squircle cornerRadius={10} cornerSmoothing={1} className="w-[30px] h-[30px] border border-[var(--col-primary)] flex items-center justify-center flex-shrink-0">
              <Pencil className="w-[11px] h-[11px] text-[var(--col-primary)]" strokeWidth={1.5} />
            </Squircle>
          </Squircle>
        </Link>
      </div>

      {/* Thumbnail placeholder */}
      {event.thumbnail ? (
        <Squircle cornerRadius={28} cornerSmoothing={1} className="w-full h-[220px] mb-6 overflow-hidden">
          <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
        </Squircle>
      ) : (
        <Squircle
          cornerRadius={28}
          cornerSmoothing={1}
          className="w-full h-[220px] mb-6 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(0 0% 88%) 0%, hsl(0 0% 82%) 100%)" }}
        >
          <div className="flex flex-col items-center gap-2 opacity-40">
            <Image className="w-10 h-10 text-[var(--col-secondary)]" strokeWidth={1} />
            <p className="text-[0.72rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Event cover photo</p>
          </div>
        </Squircle>
      )}

      {/* Title + status */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: statusDot[event.status] || statusDot.draft }} />
            <span className="text-[0.68rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
              {statusLabel[event.status] || "Draft"}
            </span>
          </div>
          <Squircle
            cornerRadius={8}
            cornerSmoothing={1}
            className="px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--col-dim)]"
            style={{ background: "hsl(0 0% 90% / 0.5)" }}
          >
            {event.category}
          </Squircle>
          {event.requiresApproval && (
            <Squircle
              cornerRadius={8}
              cornerSmoothing={1}
              className="px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--accent)]"
              style={{ background: "hsl(25 65% 45% / 0.1)" }}
            >
              Approval Required
            </Squircle>
          )}
        </div>
        <h1 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          {event.title}
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
        </h1>
        <p className="mt-3 text-[0.86rem] text-[var(--col-secondary)] leading-[1.7] max-w-[640px] font-[family-name:var(--font-ui)]">
          {event.description}
        </p>
      </div>

      {/* Info strip */}
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
              {fmt(startD)} — {fmt(endD)}
            </p>
          </div>
        </Squircle>
        <Squircle cornerRadius={16} cornerSmoothing={1} className="flex items-center gap-3 px-4 py-3" style={glassStyle}>
          <div className="w-9 h-9 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-[14px] h-[14px] text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Venue</p>
            <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{event.venue}</p>
          </div>
        </Squircle>
        {event.teamSize && (
          <Squircle cornerRadius={16} cornerSmoothing={1} className="flex items-center gap-3 px-4 py-3" style={glassStyle}>
            <div className="w-9 h-9 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <Users className="w-[14px] h-[14px] text-[var(--accent)]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Team Size</p>
              <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{event.teamSize}</p>
            </div>
          </Squircle>
        )}
      </div>

      {/* Two-column: content + stats sidebar */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        {/* Left content */}
        <div className="space-y-8">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <Squircle cornerRadius={18} cornerSmoothing={1} className="p-5 text-center" style={glassStyle}>
              <p className="text-[1.6rem] font-semibold tracking-[-0.03em] text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums leading-none">
                {event.registered}
              </p>
              <p className="text-[0.62rem] uppercase tracking-[0.12em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-2">Registered</p>
            </Squircle>
            <Squircle cornerRadius={18} cornerSmoothing={1} className="p-5 text-center" style={glassStyle}>
              <p className="text-[1.6rem] font-semibold tracking-[-0.03em] text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums leading-none">
                {spotsLeft}
              </p>
              <p className="text-[0.62rem] uppercase tracking-[0.12em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-2">Spots Left</p>
            </Squircle>
            <Squircle cornerRadius={18} cornerSmoothing={1} className="p-5 text-center" style={glassStyle}>
              <p className="text-[1.6rem] font-semibold tracking-[-0.03em] font-[family-name:var(--font-mono)] tabular-nums leading-none"
                style={{ color: fillPct >= 90 ? "var(--accent)" : "var(--col-primary)" }}>
                {fillPct}%
              </p>
              <p className="text-[0.62rem] uppercase tracking-[0.12em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-2">Fill Rate</p>
            </Squircle>
          </div>

          {/* About */}
          {event.aboutEvent && (
            <section>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">About the Event</h2>
              <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
                <p className="text-[0.86rem] text-[var(--col-secondary)] leading-[1.8] font-[family-name:var(--font-ui)]">{event.aboutEvent}</p>
              </Squircle>
            </section>
          )}

          {/* Timeline */}
          {event.timeline && event.timeline.length > 0 && (
            <section>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Event Timeline</h2>
              <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
                <div className="space-y-0">
                  {event.timeline.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center w-5 flex-shrink-0">
                        <div className="w-[10px] h-[10px] rounded-full border-2 flex-shrink-0 mt-1"
                          style={{ borderColor: i === 0 ? "var(--accent)" : "var(--col-dim)", background: i === 0 ? "var(--accent)" : "transparent" }} />
                        {i < event.timeline!.length - 1 && <div className="w-[1.5px] flex-1 bg-[var(--line-soft)]" />}
                      </div>
                      <div className="pb-6 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[0.62rem] uppercase tracking-[0.12em] text-[var(--accent)] font-medium font-[family-name:var(--font-mono)]">{item.day}</span>
                          <span className="text-[0.62rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">{item.time}</span>
                        </div>
                        <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{item.title}</p>
                        <p className="text-[0.78rem] text-[var(--col-secondary)] leading-[1.6] font-[family-name:var(--font-ui)] mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Squircle>
            </section>
          )}

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <section>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Speakers & Guests</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {event.speakers.map((speaker, i) => (
                  <Squircle key={i} cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
                    <Squircle cornerRadius={14} cornerSmoothing={1}
                      className="w-12 h-12 flex items-center justify-center text-white text-[0.62rem] font-bold font-[family-name:var(--font-display)] mb-3"
                      style={{ background: speaker.role === "Chief Guest" ? "linear-gradient(135deg, var(--accent), var(--accent-dark))" : "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}>
                      {speaker.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </Squircle>
                    <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{speaker.name}</p>
                    <Squircle cornerRadius={6} cornerSmoothing={1}
                      className="inline-block px-2 py-0.5 text-[0.56rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] mt-1.5 mb-1"
                      style={{ background: speaker.role === "Chief Guest" ? "hsl(25 65% 45% / 0.1)" : "hsl(0 0% 90% / 0.5)", color: speaker.role === "Chief Guest" ? "var(--accent)" : "var(--col-dim)" }}>
                      {speaker.role}
                    </Squircle>
                    <p className="text-[0.74rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">{speaker.org}</p>
                  </Squircle>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {event.galleryCount && event.galleryCount > 0 && (
            <section>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Event Gallery</h2>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: Math.min(event.galleryCount, 6) }).map((_, i) => (
                  <Squircle key={i} cornerRadius={16} cornerSmoothing={1} className="aspect-[4/3] flex items-center justify-center"
                    style={{ background: `linear-gradient(${135 + i * 20}deg, hsl(0 0% ${86 - i}%) 0%, hsl(0 0% ${80 - i}%) 100%)` }}>
                    <Image className="w-6 h-6 opacity-25 text-[var(--col-secondary)]" strokeWidth={1} />
                  </Squircle>
                ))}
              </div>
              {event.galleryCount > 6 && (
                <p className="text-[0.72rem] text-[var(--col-dim)] font-[family-name:var(--font-ui)] mt-2">+{event.galleryCount - 6} more photos</p>
              )}
            </section>
          )}

          {/* Certificate */}
          {event.hasCertificate && (
            <section>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Certificate Preview</h2>
              <Squircle cornerRadius={22} cornerSmoothing={1} className="p-8 flex items-center justify-center"
                style={{ ...glassStyle, background: "hsl(0 0% 98% / 0.6)", border: "1px solid hsl(0 0% 85% / 0.4)" }}>
                <div className="w-full max-w-[480px] text-center relative py-6">
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[var(--accent)] opacity-30" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[var(--accent)] opacity-30" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[var(--accent)] opacity-30" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[var(--accent)] opacity-30" />
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Certificate of Participation</p>
                  <div className="w-16 h-[1.5px] mx-auto my-3" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
                  <p className="text-[1.1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{event.title}</p>
                  <p className="text-[0.72rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mt-2">
                    This certifies participation in the event organized by {event.organization}
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-5">
                    <div>
                      <div className="w-20 h-[1px] bg-[var(--col-dim)] opacity-30 mb-1" />
                      <p className="text-[0.56rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Signature</p>
                    </div>
                    <Award className="w-8 h-8 text-[var(--accent)] opacity-15" strokeWidth={1} />
                    <div>
                      <div className="w-20 h-[1px] bg-[var(--col-dim)] opacity-30 mb-1" />
                      <p className="text-[0.56rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Date</p>
                    </div>
                  </div>
                </div>
              </Squircle>
            </section>
          )}

          {/* Organizers */}
          {event.organizers && event.organizers.length > 0 && (
            <section>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Organizer Details</h2>
              <Squircle cornerRadius={22} cornerSmoothing={1} className="p-6" style={glassStyle}>
                <div className="space-y-4">
                  {event.organizers.map((org, i) => (
                    <div key={i} className="flex items-center gap-4"
                      style={i < event.organizers!.length - 1 ? { paddingBottom: "16px", borderBottom: "1px solid hsl(0 0% 85% / 0.35)" } : undefined}>
                      <Squircle cornerRadius={12} cornerSmoothing={1}
                        className="w-10 h-10 flex items-center justify-center text-white text-[0.52rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}>
                        {org.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </Squircle>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.82rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{org.name}</p>
                        <p className="text-[0.7rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">{org.role}</p>
                      </div>
                      <a href={`mailto:${org.email}`} className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center hover:border-[var(--accent)] transition-colors duration-200 flex-shrink-0">
                        <Mail className="w-[13px] h-[13px] text-[var(--col-dim)]" strokeWidth={1.5} />
                      </a>
                    </div>
                  ))}
                </div>
              </Squircle>
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4 lg:sticky lg:top-6">
          {/* Capacity card */}
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Capacity</h3>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">{event.registered}</span>
              <span className="text-[0.92rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-0.5">/ {event.capacity}</span>
            </div>
            <p className="text-[0.68rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">
              {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} remaining` : "Event is full"}
            </p>
            <div className="h-[4px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${fillPct}%`, background: fillPct >= 90 ? "var(--accent)" : "var(--col-primary)" }} />
            </div>
          </Squircle>

          {/* Organization card */}
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <div className="flex items-center gap-3">
              <Squircle cornerRadius={12} cornerSmoothing={1}
                className="w-10 h-10 flex items-center justify-center text-white text-[0.52rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 30%))" }}>
                {event.organization.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </Squircle>
              <div className="flex-1 min-w-0">
                <p className="text-[0.82rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{event.organization}</p>
                <p className="text-[0.68rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">Organized by {event.organizer}</p>
              </div>
            </div>
          </Squircle>

          {/* Management links */}
          <Squircle cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
            <h3 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-4">Manage</h3>
            <div className="space-y-2">
              {managementLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <div className="flex items-center gap-3 p-3 transition-all duration-200 hover:bg-[hsl(0_0%_100%_/_0.4)] cursor-pointer" style={{ borderRadius: "12px" }}>
                      <div className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-[14px] h-[14px] text-[var(--col-dim)]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.78rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-display)]">{link.label}</p>
                        <p className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-ui)]">{link.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Squircle>
        </div>
      </div>
    </div>
  );
}
