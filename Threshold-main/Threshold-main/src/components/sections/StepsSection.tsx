import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const stepNames = ["Discover", "Design", "Build", "Deploy"];
const stepPcts = ["25%", "50%", "75%", "100%"];

const steps = [
  { title: <>Discover</>, desc: "We immerse ourselves in your business — goals, users, constraints, and competitive landscape. Stakeholder interviews, technical audits, and market mapping produce a shared understanding before a single pixel is drawn.", chips: ["Discovery Workshop", "User Research", "Tech Audit", "Project Brief"], duration: "1–2 weeks", icon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
  { title: <>Design</>, desc: "Information architecture, wireframes, design system, high-fidelity UI — all reviewed with you at every stage. We iterate until the design earns approval, then produce pixel-perfect specs for engineering.", chips: ["Wireframes", "Design System", "Hi-Fi Prototype", "Dev Handoff"], duration: "2–4 weeks", icon: <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13L8 3 5 6l2 2" /><line x1="2" y1="22" x2="7" y2="17" /></> },
  { title: <>Build</>, desc: "Engineering in two-week sprints with daily updates and staging previews. Code reviews, automated testing, and performance benchmarks run continuously — so quality is built in, not bolted on at the end.", chips: ["Sprint Cycles", "Staging Previews", "QA & Testing", "Performance Audit"], duration: "4–10 weeks", icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
  { title: <>Deploy</>, desc: "Zero-downtime release with rollback plans, monitoring dashboards, and a 30-day hypercare period. We don't disappear at launch — we stay to ensure everything runs exactly as designed.", chips: ["CI/CD Pipeline", "Monitoring Setup", "30-day Hypercare", "Documentation"], duration: "1–2 weeks", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
];

const StepsSection = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<boolean[]>([true, false, false, false]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;

    const scrollObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(parseInt((e.target as HTMLElement).dataset.step || "0"));
      }),
      { threshold: 0.5 }
    );
    const entranceObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = parseInt((e.target as HTMLElement).dataset.step || "0");
          setTimeout(() => setVisible((v) => { const n = [...v]; n[i] = true; return n; }), i * 120);
          entranceObs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    items.forEach((el) => { scrollObs.observe(el); entranceObs.observe(el); });
    return () => { scrollObs.disconnect(); entranceObs.disconnect(); };
  }, []);

  const sectionRevealRef = useReveal<HTMLElement>();

  return (
    <section
      className="py-[70px] pb-[90px] md:py-[120px] md:pb-[140px] section-transparent relative"
      id="process"
      ref={(el) => { (ref as React.MutableRefObject<HTMLDivElement | null>).current = el as unknown as HTMLDivElement; (sectionRevealRef as React.MutableRefObject<HTMLElement | null>).current = el; }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        <p className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
          <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />How we work
        </p>
        <h2 className="reveal delay-1 text-[clamp(1.8rem,7vw,3.6rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary max-w-[580px] mb-4">
          From brief to launch —<br />four <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">precise</em> phases
        </h2>
        <p className="reveal delay-2 text-[0.88rem] text-col-tertiary leading-[1.7] font-normal max-w-[420px] mb-20">
          A rigorous, transparent process refined across dozens of projects. No surprises — just clear milestones and consistent delivery.
        </p>

        <div className="grid gap-12 lg:gap-20 items-start grid-cols-1 lg:grid-cols-2">
          {/* Sticky visual */}
          <div className="relative lg:sticky top-20 order-1 lg:order-none mb-10 lg:mb-0">
            <div
              className="bg-[hsl(210_8%_93%/0.6)] border border-col-line-soft/50 rounded-[24px] overflow-hidden relative flex flex-col backdrop-blur-[24px] shadow-[0_4px_40px_var(--shadow),inset_0_1px_0_var(--glow)]"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Top */}
              <div className="flex-1 bg-[hsl(210_10%_90%/0.5)] border-b border-col-line/70 relative flex items-center justify-center p-8">
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                  <div className="process-circle-outer" style={{ ["--pct" as string]: stepPcts[active] }}>
                    <div className="w-[76px] h-[76px] rounded-full bg-[hsl(210_8%_96%/0.8)] flex items-center justify-center shadow-[inset_0_1px_4px_var(--shadow)]">
                      <span className="text-[1.8rem] font-light text-col-primary leading-none">{active + 1}</span>
                    </div>
                  </div>
                  <span className="text-[0.7rem] tracking-[0.18em] uppercase text-col-dim font-normal">{stepNames[active]}</span>
                </div>
                {/* Deco lines */}
                <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-2">
                  <div className="h-px rounded-px bg-col-line/50 w-[60%]" />
                  <div className="h-px rounded-px bg-col-line/50 w-[40%]" />
                  <div className="h-px rounded-px bg-col-line/50 w-[75%]" />
                </div>
              </div>
              {/* Timeline dots */}
              <div className="flex justify-center items-center gap-[6px] p-5">
                {stepNames.map((_, i) => (
                  <div key={i} className={`w-[5px] h-[5px] rounded-full transition-all duration-[400ms] ${active === i ? "bg-col-secondary scale-[1.4]" : "bg-col-line/70"}`} />
                ))}
              </div>
              {/* Bottom */}
              <div className="px-6 py-5 flex items-center justify-between border-t border-col-line/70">
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-col-dim">Current phase</span>
                <span className="text-[0.72rem] font-medium text-col-secondary">0{active + 1} / {stepNames[active]}</span>
              </div>
            </div>
          </div>

          {/* Steps list */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div
                key={i}
                data-step={i}
                onClick={() => setActive(i)}
                className={`py-8 md:py-10 border-b border-col-line/70 grid gap-4 md:gap-6 cursor-default transition-all duration-[600ms] first:pt-0 last:border-none ${visible[i] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                style={{ gridTemplateColumns: "48px 1fr" }}
              >
                {/* Left col */}
                <div className="flex flex-col items-center gap-2 pt-1">
                  <span className={`text-[0.6rem] tracking-[0.18em] font-normal transition-colors duration-300 ${active === i ? "text-col-secondary" : "text-col-dim"}`}>0{i + 1}</span>
                  <div className={`w-[38px] h-[38px] rounded-[10px] border flex items-center justify-center transition-all duration-300 shadow-[0_1px_6px_var(--shadow)] ${active === i ? "border-col-warm bg-[hsl(30_10%_94%)]" : "border-col-line/70 bg-[hsl(210_8%_95%/0.7)]"}`}>
                    <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] transition-colors duration-300 ${active === i ? "stroke-col-primary" : "stroke-col-tertiary"}`}>
                      {s.icon}
                    </svg>
                  </div>
                  {i < steps.length - 1 && <div className="flex-1 w-px bg-col-line/50 my-[6px] min-h-5" />}
                </div>
                {/* Content */}
                <div>
                  <p className="text-[0.6rem] tracking-[0.22em] uppercase text-col-dim mb-[10px] font-normal">Phase 0{i + 1}</p>
                  <h3 className="text-[1.4rem] font-normal tracking-[-0.025em] leading-[1.15] mb-3 text-col-primary">{s.title}</h3>
                  <p className="text-[0.84rem] text-col-tertiary leading-[1.75] font-normal mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-[6px]">
                    {s.chips.map((c) => (
                      <span key={c} className="text-[0.58rem] tracking-[0.08em] uppercase px-[10px] py-1 rounded-full border border-col-line/70 bg-col-surface/60 text-col-dim font-normal">{c}</span>
                    ))}
                  </div>
                  <p className="flex items-center gap-[6px] text-[0.65rem] text-col-dim mt-[14px]">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-col-dim fill-none stroke-[1.5] [stroke-linecap:round]">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    {s.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
