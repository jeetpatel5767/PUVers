"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { ArrowLeft, Check } from "lucide-react";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const events = useDemoStore((s) => s.events);
  const event = events.find((e) => e.id === id);
  const [showSaved, setShowSaved] = useState(false);

  if (!event) {
    return (
      <div className="py-20 text-center">
        <p className="text-[0.92rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-4">Event not found.</p>
        <Link href="/admin/events" className="text-[var(--accent)] text-[0.84rem] font-medium font-[family-name:var(--font-ui)]">
          &larr; Back to events
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaved(true);
  };

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const inputStyle = {
    background: "hsl(0 0% 100% / 0.55)",
    border: "1px solid hsl(0 0% 85% / 0.5)",
    borderRadius: "14px",
  };

  const fields = [
    { label: "Event Title", id: "title", type: "text", defaultValue: event.title },
    { label: "Venue", id: "venue", type: "text", defaultValue: event.venue },
    { label: "Capacity", id: "capacity", type: "number", defaultValue: String(event.capacity) },
    { label: "Start Date", id: "startDate", type: "datetime-local", defaultValue: event.startDate.slice(0, 16) },
    { label: "End Date", id: "endDate", type: "datetime-local", defaultValue: event.endDate.slice(0, 16) },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href={`/admin/events/${id}`}
            className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to event
          </Link>
          <h1 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
            Edit Event
            <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
          </h1>
        </div>
      </div>

      <div className="max-w-[640px]">
        <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7" style={glassStyle}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  defaultValue={field.defaultValue}
                  required
                  className="w-full px-4 py-3 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30"
                  style={inputStyle}
                />
              </div>
            ))}

            {/* Description textarea */}
            <div>
              <label
                htmlFor="description"
                className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                defaultValue={event.description}
                required
                rows={4}
                className="w-full px-4 py-3 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30 resize-none"
                style={inputStyle}
              />
            </div>

            {/* About Event textarea */}
            <div>
              <label
                htmlFor="about"
                className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2"
              >
                About Event
              </label>
              <textarea
                id="about"
                defaultValue={event.aboutEvent || ""}
                rows={4}
                className="w-full px-4 py-3 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30 resize-none"
                style={inputStyle}
                placeholder="Optional — tell attendees more about this event"
              />
            </div>

            {/* Team size */}
            <div>
              <label
                htmlFor="teamSize"
                className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2"
              >
                Team Size <span className="normal-case tracking-normal text-[var(--col-dim)]">(optional)</span>
              </label>
              <input
                id="teamSize"
                type="text"
                defaultValue={event.teamSize || ""}
                placeholder="e.g. 2–4 members"
                className="w-full px-4 py-3 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30"
                style={inputStyle}
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Squircle
                cornerRadius={16}
                cornerSmoothing={1}
                className="group inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
                asChild
              >
                <button type="submit">
                  Save Changes
                  <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Squircle>
                </button>
              </Squircle>

              <Link href={`/admin/events/${id}`}>
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
        </Squircle>
      </div>

      {/* Success modal */}
      {showSaved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => { setShowSaved(false); router.push(`/admin/events/${id}`); }} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-7 animate-scale-in text-center"
            style={{ background: "hsl(0 0% 96% / 0.9)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[hsl(142_50%_45%_/_0.12)] flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-[hsl(142,50%,35%)]" strokeWidth={2} />
            </div>
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">Event Updated</h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-5">Changes saved successfully (demo).</p>
            <Squircle
              cornerRadius={14}
              cornerSmoothing={1}
              className="w-full text-center text-[0.8rem] font-medium py-[11px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              style={{ boxShadow: "0 2px 12px var(--shadow-lg)" }}
              asChild
            >
              <button onClick={() => { setShowSaved(false); router.push(`/admin/events/${id}`); }}>
                Done
              </button>
            </Squircle>
          </Squircle>
        </div>
      )}
    </div>
  );
}
