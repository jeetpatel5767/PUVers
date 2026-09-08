"use client";

import Link from "next/link";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import { Search, MapPin, Clock, Users } from "lucide-react";

export default function StudentEventsPage() {
  const events = useDemoStore((s) => s.events);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const published = events.filter((e) => e.status === "published" || e.status === "PUBLISHED");
  const categories: string[] = ["all", ...Array.from(new Set(published.map((e) => e.category || e.eventCategory || "General")))];

  const filtered = published.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.about || e.description || "").toLowerCase().includes(search.toLowerCase());
    const eventCat = e.category || e.eventCategory || "General";
    const matchCat = category === "all" || eventCat === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-4 font-[family-name:var(--font-mono)]">
          <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
          Events
        </p>
        <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
          Browse Events
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
            {" "}.
          </span>
        </h1>
        <p className="mt-2 text-[0.88rem] text-[var(--col-secondary)] leading-[1.6] font-[family-name:var(--font-ui)]">
          Discover and register for campus events.
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row mb-6">
        <Squircle
          cornerRadius={16}
          cornerSmoothing={1}
          className="flex-1 flex items-center gap-3 px-4 py-3"
          style={{
            background: "hsl(0 0% 96% / 0.42)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.5), 0 1px 4px var(--shadow)",
          }}
        >
          <Search className="w-4 h-4 text-[var(--col-dim)] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
          />
        </Squircle>

        <Squircle
          cornerRadius={16}
          cornerSmoothing={1}
          className="flex items-center gap-[3px] p-[3px] sm:w-auto"
          style={{
            background: "hsl(0 0% 96% / 0.42)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.5), 0 1px 4px var(--shadow)",
          }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-[0.74rem] font-medium px-4 py-[8px] transition-all duration-300 font-[family-name:var(--font-ui)] whitespace-nowrap capitalize ${
                category === c
                  ? "bg-[var(--col-primary)] text-[var(--bg)]"
                  : "text-[var(--col-secondary)] hover:text-[var(--col-primary)]"
              }`}
              style={{ borderRadius: "13px" }}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </Squircle>
      </div>

      {/* Event grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((event) => {
          const spotsLeft = event.capacity - event.registered;
          const fillPercent = Math.round((event.registered / event.capacity) * 100);
          const d = new Date(event.startDate);
          const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
          const isHot = spotsLeft < 10;

          return (
            <Link key={event.id} href={`/student/events/${event.id}`} className="group/card">
              <Squircle
                cornerRadius={28}
                cornerSmoothing={1}
                className="p-5 h-full flex flex-col transition-all duration-300 group-hover/card:-translate-y-1"
                style={{
                  background: "hsl(0 0% 96% / 0.42)",
                  backdropFilter: "blur(24px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                  boxShadow: "0 2px 24px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6), inset 0 -1px 0 hsl(0 0% 80% / 0.1)",
                }}
              >
                {/* Top row — category + arrow */}
                <div className="flex items-center justify-between mb-3">
                  <Squircle
                    cornerRadius={8}
                    cornerSmoothing={1}
                    className="px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] text-[var(--accent)]"
                    style={{ background: "hsl(25 65% 45% / 0.1)" }}
                  >
                    {event.category}
                  </Squircle>
                  <div className="w-8 h-8 rounded-full border border-[var(--accent)] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/card:bg-[var(--accent)]">
                    <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[var(--accent)] group-hover/card:stroke-white fill-none stroke-2 transition-all duration-300 -rotate-45 group-hover/card:rotate-0" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] leading-[1.3] mb-1.5">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-[0.74rem] text-[var(--col-secondary)] leading-[1.65] font-[family-name:var(--font-ui)] line-clamp-2 mb-4">
                  {event.description}
                </p>

                {/* Time & Venue — inner card */}
                <Squircle
                  cornerRadius={18}
                  cornerSmoothing={1}
                  className="p-3.5 mb-4"
                  style={{
                    background: "hsl(0 0% 100% / 0.55)",
                    boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.7), 0 1px 3px hsl(0 0% 0% / 0.04)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Date + time */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(25 65% 45% / 0.1)" }}>
                        <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.78rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] leading-tight">
                          {formatDate(event.startDate)}
                        </p>
                        <p className="text-[0.65rem] text-[var(--col-secondary)] font-[family-name:var(--font-mono)]">
                          {timeStr}
                        </p>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-8 flex-shrink-0" style={{ background: "hsl(0 0% 80% / 0.35)" }} />

                    {/* Venue */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(25 65% 45% / 0.1)" }}>
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                      </div>
                      <p className="text-[0.78rem] font-medium text-[var(--col-primary)] font-[family-name:var(--font-ui)] leading-tight truncate">
                        {event.venue}
                      </p>
                    </div>
                  </div>
                </Squircle>

                {/* Bottom row — organizer + capacity */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 min-w-0">
                    <Squircle
                      cornerRadius={8}
                      cornerSmoothing={1}
                      className="w-6 h-6 flex items-center justify-center text-white text-[0.42rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--col-primary), hsl(0 0% 35%))" }}
                    >
                      {event.organizer?.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </Squircle>
                    <span className="text-[0.68rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] truncate">
                      {event.organizer}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 flex-shrink-0"
                    style={{
                      borderRadius: "20px",
                      background: isHot ? "hsl(25 65% 45% / 0.1)" : "hsl(0 0% 0% / 0.03)",
                      border: isHot ? "1px solid hsl(25 65% 45% / 0.18)" : "1px solid hsl(0 0% 80% / 0.25)",
                    }}
                  >
                    <Users className={`w-[10px] h-[10px] ${isHot ? "text-[var(--accent)]" : "text-[var(--col-dim)]"}`} />
                    <span className={`text-[0.62rem] font-semibold font-[family-name:var(--font-mono)] ${isHot ? "text-[var(--accent)]" : "text-[var(--col-secondary)]"}`}>
                      {spotsLeft} left
                    </span>
                  </div>
                </div>
              </Squircle>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-[0.88rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
            No events match your search.
          </p>
        </div>
      )}
    </div>
  );
}
