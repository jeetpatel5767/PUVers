"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Squircle } from "@squircle-js/react";
import { EVENTS } from "@/constants/mock-data";

const liveEvents = EVENTS.filter((e) => e.status === "published" || e.status === "PUBLISHED");
const INTERVAL = 5000;
const LETTER_STAGGER = 30;

export default function LandingPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible");

  const transition = useCallback((nextIdx: number) => {
    if (phase !== "visible") return;
    setPhase("exit");
    setTimeout(() => {
      setDisplayIdx(nextIdx);
      setPhase("enter");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("visible"));
      });
    }, 500);
  }, [phase]);

  const goToNext = useCallback(() => {
    const next = (activeIdx + 1) % liveEvents.length;
    setActiveIdx(next);
    transition(next);
  }, [activeIdx, transition]);

  useEffect(() => {
    const timer = setInterval(goToNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext]);

  const event = liveEvents[displayIdx];
  const letters = useMemo(() => event.title.split(""), [event.title]);

  const metaClass =
    phase === "exit"
      ? "translate-y-[-40px] opacity-0"
      : phase === "enter"
        ? "translate-y-[40px] opacity-0"
        : "translate-y-0 opacity-100";

  return (
    <div className="min-h-screen relative">
      {/* Blob background */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[200]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-6 md:px-12">
          <Link href="/" className="flex items-center gap-[7px] z-[201]">
            <div className="w-[7px] h-[7px] rounded-full bg-[var(--accent)] flex-shrink-0 shadow-[0_1px_4px_var(--shadow-lg)]" />
            <div className="text-[1.1rem] leading-none">
              <span className="font-extrabold text-[var(--col-primary)] tracking-[-0.02em] font-[family-name:var(--font-display)]">
                PU
              </span>
              <span className="font-normal text-[var(--col-secondary)] font-[family-name:var(--font-cursive)]">
                verse
              </span>
            </div>
          </Link>

          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            className="hidden md:flex items-center gap-7 border border-[hsl(0_0%_78%_/_0.7)] px-7 py-[10px]"
            style={{
              background: "hsl(0 0% 96% / 0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 2px 16px var(--shadow), inset 0 1px 0 var(--glow)",
            }}
          >
            {["Events", "How it works", "About", "Contact"].map((label) => (
              <span
                key={label}
                className="text-[0.8rem] text-[var(--col-secondary)] font-normal cursor-pointer transition-colors duration-300 hover:text-[var(--col-primary)] font-[family-name:var(--font-ui)]"
              >
                {label}
              </span>
            ))}
          </Squircle>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/register"
              className="text-[0.8rem] text-[var(--col-secondary)] font-medium transition-colors duration-300 hover:text-[var(--col-primary)] font-[family-name:var(--font-display)]"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-[0.8rem] font-medium px-[22px] py-[9px] rounded-full bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 shadow-[0_2px_12px_var(--shadow-lg)] hover:opacity-80 hover:scale-[1.02] active:scale-[0.98] font-[family-name:var(--font-display)]"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 section-transparent h-screen flex items-center pt-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 w-full">
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-stretch"
            style={{ height: "clamp(480px, calc(100vh - 180px), 720px)" }}
          >

            {/* ── Left column ── */}
            <div className="flex flex-col justify-between">
              {/* Top: event content (animated) */}
              <div className="pt-12">
                <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-5 font-[family-name:var(--font-mono)]">
                  <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
                  Upcoming Events
                </p>

                <div className="overflow-hidden mb-3 h-[22px]">
                  <span
                    className={`inline-block text-[0.6rem] tracking-[0.12em] uppercase px-[10px] py-1 rounded-full border border-[hsl(0_0%_85%_/_0.5)] bg-[hsl(0_0%_96%_/_0.55)] text-[var(--col-dim)] font-[family-name:var(--font-mono)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${metaClass}`}
                  >
                    {event.category}
                  </span>
                </div>

                <div className="overflow-hidden mb-4">
                  <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                    {letters.map((char, i) => (
                      <span
                        key={`${displayIdx}-${i}`}
                        className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          transitionDuration: "500ms",
                          transitionDelay: `${i * LETTER_STAGGER}ms`,
                          transform:
                            phase === "exit"
                              ? "translateY(-110%)"
                              : phase === "enter"
                                ? "translateY(110%)"
                                : "translateY(0)",
                          opacity: phase === "visible" ? 1 : 0,
                        }}
                      >
                        {char === " " ? " " : char}
                      </span>
                    ))}
                    <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[clamp(1.4rem,3.5vw,2.4rem)]">
                      {" "}.
                    </span>
                  </h1>
                </div>

                <div className="overflow-hidden mb-5">
                  <p
                    className={`text-[0.9rem] text-[var(--col-secondary)] leading-[1.7] max-w-[440px] font-[family-name:var(--font-ui)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[80ms] ${metaClass}`}
                  >
                    {event.description}
                  </p>
                </div>

                <div className="overflow-hidden">
                  <div
                    className={`flex items-center gap-5 pt-4 border-t border-[hsl(0_0%_85%_/_0.5)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[120ms] ${metaClass}`}
                  >
                    <div>
                      <p className="text-[0.56rem] tracking-[0.2em] uppercase text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Venue</p>
                      <p className="text-[0.84rem] font-medium text-[var(--col-primary)] mt-[2px]">{event.venue}</p>
                    </div>
                    <div className="w-px h-7 bg-[hsl(0_0%_85%_/_0.5)]" />
                    <div>
                      <p className="text-[0.56rem] tracking-[0.2em] uppercase text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Capacity</p>
                      <p className="text-[0.84rem] font-medium text-[var(--col-primary)] mt-[2px] font-[family-name:var(--font-mono)]">{event.registered}/{event.capacity}</p>
                    </div>
                    <div className="w-px h-7 bg-[hsl(0_0%_85%_/_0.5)]" />
                    <div>
                      <p className="text-[0.56rem] tracking-[0.2em] uppercase text-[var(--col-dim)] font-[family-name:var(--font-mono)]">By</p>
                      <p className="text-[0.84rem] font-medium text-[var(--col-primary)] mt-[2px]">{event.organization}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: buttons + dots (never animate) */}
              <div className="pb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Squircle
                    cornerRadius={18}
                    cornerSmoothing={1}
                    className="group inline-flex items-center gap-[10px] text-[0.78rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                    style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
                    asChild
                  >
                    <Link href="/student/events">
                      Browse all events
                      <Squircle
                        cornerRadius={14}
                        cornerSmoothing={1.0}
                        className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0"
                      >
                        <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Squircle>
                    </Link>
                  </Squircle>

                  <Squircle
                    cornerRadius={18}
                    cornerSmoothing={1}
                    className="group inline-flex items-center gap-[10px] text-[0.78rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[hsl(0_0%_96%_/_0.55)] text-[var(--col-primary)] transition-all duration-300 hover:bg-[hsl(0_0%_96%_/_0.8)] font-[family-name:var(--font-display)] cursor-pointer"
                    style={{
                      boxShadow: "0 2px 12px var(--shadow)",
                      WebkitBackdropFilter: "blur(12px)",
                      backdropFilter: "blur(12px)",
                    }}
                    asChild
                  >
                    <Link href={`/student/events/${event.id}`}>
                      View event details
                      <Squircle
                        cornerRadius={14}
                        cornerSmoothing={1.0}
                        className="w-[34px] h-[34px] border border-[var(--col-primary)] flex items-center justify-center flex-shrink-0"
                      >
                        <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Squircle>
                    </Link>
                  </Squircle>
                </div>
                <div className="flex items-center gap-[6px]">
                  {liveEvents.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === activeIdx || phase !== "visible") return;
                        setActiveIdx(i);
                        transition(i);
                      }}
                      className={`w-[5px] h-[5px] rounded-full transition-all duration-[400ms] ${displayIdx === i
                        ? "bg-[var(--col-primary)] scale-[1.4]"
                        : "bg-[var(--line)] hover:bg-[var(--col-secondary)]"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column — glass card ── */}
            <div className="hidden lg:block h-full">
              <Squircle
                cornerRadius={34}
                cornerSmoothing={1.0}
                className="h-full relative overflow-hidden"
                style={{
                  background: "hsl(0 0% 96% / 0.55)",
                  WebkitBackdropFilter: "blur(20px)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 var(--glow)",
                  padding: "2.25rem",
                  transition: "all 0.6s ease",
                }}
              >
                <div className="absolute w-[200px] h-[200px] rounded-full bg-[hsl(25_65%_45%_/_0.08)] blur-[60px] pointer-events-none top-[-40px] right-[-40px]" />
              </Squircle>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
