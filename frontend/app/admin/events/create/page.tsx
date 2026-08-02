"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { ArrowLeft, Check } from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();
  const createEvent = useDemoStore((s) => s.createEvent);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    createEvent({
      title: form.get("title") as string,
      description: form.get("description") as string,
      organization: form.get("organization") as string,
      venue: form.get("venue") as string,
      startDate: form.get("startDate") as string,
      endDate: form.get("endDate") as string,
      capacity: Number(form.get("capacity")),
      category: form.get("category") as string,
      organizer: "Priya Mehta",
      requiresApproval: form.get("requiresApproval") === "yes",
    });
    setShowSuccess(true);
  };

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const inputClass =
    "w-full px-4 py-3 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30";

  const inputStyle = {
    background: "hsl(0 0% 100% / 0.55)",
    border: "1px solid hsl(0 0% 85% / 0.5)",
    borderRadius: "14px",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
  };

  const labelClass =
    "block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)] mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to events
        </Link>
        <h1 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          Create Event
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
        </h1>
        <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
          Submit a new event for super admin approval.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT — Event Details */}
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7" style={glassStyle}>
            <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-5">
              Event Details
            </h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className={labelClass}>Event Title</label>
                <input id="title" name="title" type="text" required defaultValue="New Campus Event"
                  className={inputClass} style={inputStyle} />
              </div>

              <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea id="description" name="description" required rows={3} defaultValue="Describe your event..."
                  className={`${inputClass} resize-none`} style={inputStyle} />
              </div>

              <div>
                <label htmlFor="about" className={labelClass}>
                  About Event <span className="normal-case tracking-normal text-[var(--col-dim)]">(optional)</span>
                </label>
                <textarea id="about" name="about" rows={4} placeholder="Tell attendees more about this event..."
                  className={`${inputClass} resize-none`} style={inputStyle} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="organization" className={labelClass}>Organization</label>
                  <select id="organization" name="organization" className={`${inputClass} cursor-pointer`} style={selectStyle}>
                    <option value="Tech Fest Committee">Tech Fest Committee</option>
                    <option value="Computer Science Club">Computer Science Club</option>
                    <option value="Innovation Cell">Innovation Cell</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className={labelClass}>Category</label>
                  <select id="category" name="category" className={`${inputClass} cursor-pointer`} style={selectStyle}>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Competition">Competition</option>
                    <option value="Career">Career</option>
                  </select>
                </div>
              </div>
            </div>
          </Squircle>

          {/* RIGHT — Schedule & Settings */}
          <div className="space-y-6">
            <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7" style={glassStyle}>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-5">
                Schedule & Venue
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="venue" className={labelClass}>Venue</label>
                  <input id="venue" name="venue" type="text" required defaultValue="Seminar Hall 2"
                    className={inputClass} style={inputStyle} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="startDate" className={labelClass}>Start</label>
                    <input id="startDate" name="startDate" type="datetime-local" required defaultValue="2026-09-01T09:00"
                      className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="endDate" className={labelClass}>End</label>
                    <input id="endDate" name="endDate" type="datetime-local" required defaultValue="2026-09-01T17:00"
                      className={inputClass} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label htmlFor="teamSize" className={labelClass}>
                    Team Size <span className="normal-case tracking-normal text-[var(--col-dim)]">(optional)</span>
                  </label>
                  <input id="teamSize" name="teamSize" type="text" placeholder="e.g. 2–4 members"
                    className={inputClass} style={inputStyle} />
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7" style={glassStyle}>
              <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-5">
                Settings
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="capacity" className={labelClass}>Capacity</label>
                  <input id="capacity" name="capacity" type="number" required defaultValue="100"
                    className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label htmlFor="requiresApproval" className={labelClass}>Registration Approval</label>
                  <select id="requiresApproval" name="requiresApproval" className={`${inputClass} cursor-pointer`} style={selectStyle}>
                    <option value="no">No — Open registration</option>
                    <option value="yes">Yes — Manual approval</option>
                  </select>
                </div>
              </div>
            </Squircle>
          </div>
        </div>

        {/* Submit row — full width below both columns */}
        <div className="flex items-center gap-3 mt-6">
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            className="group inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
            style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
            asChild
          >
            <button type="submit">
              Submit for Approval
              <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Squircle>
            </button>
          </Squircle>

          <Link href="/admin/events">
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              className="inline-flex items-center text-[0.82rem] font-medium px-5 py-[10px] transition-all duration-300 hover:bg-[hsl(0_0%_92%)] font-[family-name:var(--font-display)] cursor-pointer text-[var(--col-secondary)]"
              style={{ background: "hsl(0 0% 100% / 0.5)", border: "1px solid hsl(0 0% 85% / 0.4)" }}
            >
              Cancel
            </Squircle>
          </Link>
        </div>
      </form>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => { setShowSuccess(false); router.push("/admin/events"); }} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-7 animate-scale-in text-center"
            style={{ background: "hsl(0 0% 96% / 0.9)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[hsl(142_50%_45%_/_0.12)] flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-[hsl(142,50%,35%)]" strokeWidth={2} />
            </div>
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">Event Submitted</h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-5">Your event has been submitted for super admin approval.</p>
            <Squircle
              cornerRadius={14}
              cornerSmoothing={1}
              className="w-full text-center text-[0.8rem] font-medium py-[11px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              style={{ boxShadow: "0 2px 12px var(--shadow-lg)" }}
              asChild
            >
              <button onClick={() => { setShowSuccess(false); router.push("/admin/events"); }}>
                View My Events
              </button>
            </Squircle>
          </Squircle>
        </div>
      )}
    </div>
  );
}
