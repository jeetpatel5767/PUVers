import { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

const Tag = ({ label }: { label: string }) => (
  <span className="text-[0.6rem] tracking-[0.08em] uppercase px-[10px] py-1 rounded-full border border-col-line/70 bg-col-surface/60 text-col-dim font-normal">{label}</span>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] stroke-current fill-none stroke-2 [stroke-linecap:round]">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

type CaseData = {
  cat: string; title: React.ReactNode; desc: string;
  metrics: { val: React.ReactNode; label: string }[];
  tags: string[]; visualLabel: string;
  badge: { p: string; span: React.ReactNode }; mini: string;
};

const cases: CaseData[] = [
  { cat: "Featured Project · Full Stack", title: <>Nexus <em className="font-pacifico not-italic text-[0.95em] text-col-tertiary">Dashboard</em></>, desc: "A real-time operations platform for a logistics company — combining AI-driven route optimisation, live tracking, and a zero-friction command interface designed for field operators.", metrics: [{ val: <>3<em className="font-pacifico not-italic text-[0.8em] text-col-warm">×</em></>, label: "faster decision-making" }, { val: <>98<em className="font-pacifico not-italic text-[0.8em] text-col-warm">%</em></>, label: "uptime SLA achieved" }, { val: <>6<em className="font-pacifico not-italic text-[0.8em] text-col-warm">wk</em></>, label: "delivered on schedule" }], tags: ["Next.js", "TypeScript", "OpenAI", "Figma", "AWS"], visualLabel: "[ dashboard interface — project shot ]", badge: { p: "Delivery time", span: <>6 <em className="font-pacifico not-italic text-[hsl(170_60%_45%)] text-[0.7em]">wks</em></> }, mini: "Nexus" },
  { cat: "UI/UX Design · Mobile", title: <>Aura <em className="font-pacifico not-italic text-[0.95em] text-col-tertiary">Health</em> App</>, desc: "End-to-end design for a wellness tracking app — from research and wireframes to a full design system with 120+ screens, accessible components, and Figma developer handoff.", metrics: [{ val: <>4.9<em className="font-pacifico not-italic text-[0.8em] text-col-warm">★</em></>, label: "App Store rating" }, { val: <>40<em className="font-pacifico not-italic text-[0.8em] text-col-warm">%</em></>, label: "drop in support tickets" }], tags: ["Figma", "Design System", "iOS", "Android"], visualLabel: "[ mobile app UI — project shot ]", badge: { p: "Screens designed", span: <>120<em className="font-pacifico not-italic text-[hsl(170_60%_45%)] text-[0.7em]">+</em></> }, mini: "Aura" },
  { cat: "Frontend Dev · Web App", title: <>Orbit <em className="font-pacifico not-italic text-[0.95em] text-col-tertiary">Analytics</em></>, desc: "A high-performance SaaS analytics platform built with Next.js and edge rendering — 99 Lighthouse, sub-second loads globally, and a modular component architecture ready to scale.", metrics: [{ val: <>99<em className="font-pacifico not-italic text-[0.8em] text-col-warm">%</em></>, label: "Lighthouse performance" }, { val: <>0.8<em className="font-pacifico not-italic text-[0.8em] text-col-warm">s</em></>, label: "average load time" }], tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"], visualLabel: "[ web app — project shot ]", badge: { p: "Lighthouse score", span: <>99<em className="font-pacifico not-italic text-[hsl(170_60%_45%)] text-[0.7em]">/100</em></> }, mini: "Orbit" },
  { cat: "AI Systems · Automation", title: <>Signal <em className="font-pacifico not-italic text-[0.95em] text-col-tertiary">Ai</em> Pipeline</>, desc: "A multi-agent LLM system for a legal firm — automating contract review, clause extraction, and risk flagging at scale. 200 hours of manual work eliminated weekly.", metrics: [{ val: <>200<em className="font-pacifico not-italic text-[0.8em] text-col-warm">h</em></>, label: "saved per week" }, { val: <>94<em className="font-pacifico not-italic text-[0.8em] text-col-warm">%</em></>, label: "accuracy on extraction" }], tags: ["OpenAI", "LangChain", "Python", "AWS Lambda"], visualLabel: "[ AI pipeline diagram — project shot ]", badge: { p: "Hours saved / week", span: <>200<em className="font-pacifico not-italic text-[hsl(170_60%_45%)] text-[0.7em]">h</em></> }, mini: "Signal" },
  { cat: "Cybersecurity · Audit & Hardening", title: <>Vault <em className="font-pacifico not-italic text-[0.95em] text-col-tertiary">Secure</em> Audit</>, desc: "Full-scope penetration test and security architecture review for a fintech startup pre-launch — 47 vulnerabilities identified and resolved, SOC 2 readiness achieved in 8 weeks.", metrics: [{ val: <>47<em className="font-pacifico not-italic text-[0.8em] text-col-warm">✓</em></>, label: "vulnerabilities fixed" }, { val: <>8<em className="font-pacifico not-italic text-[0.8em] text-col-warm">wk</em></>, label: "to SOC 2 readiness" }], tags: ["PenTest", "SOC 2", "OWASP", "Zero-Trust"], visualLabel: "[ security audit report — project shot ]", badge: { p: "Vulnerabilities closed", span: <>47<em className="font-pacifico not-italic text-[hsl(170_60%_45%)] text-[0.7em]">✓</em></> }, mini: "Vault" },
];

const tabs = ["All", "UI/UX Design", "Frontend", "AI Systems", "Cybersecurity", "Web3"];

const TabsSection = () => {
  const [active, setActive] = useState(0);
  const c = cases[Math.min(active, cases.length - 1)];
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-[70px] pb-[90px] md:py-[120px] md:pb-[140px] section-transparent relative" id="work">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        <p className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
          <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />Selected work
        </p>
        <h2 className="reveal delay-1 text-[clamp(1.8rem,7vw,3.6rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary max-w-[640px] mb-4">
          Projects built with<br /><em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">intention</em> and precision
        </h2>
        <p className="reveal delay-2 text-[0.88rem] text-col-tertiary leading-[1.7] font-normal max-w-[440px] mb-[52px]">
          A curated look at what we've shipped — across design, engineering, AI, and the decentralised web.
        </p>

        {/* Tab bar */}
        <div className="reveal delay-3 flex flex-wrap gap-2 mb-[52px]">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`font-['Syne'] text-[0.78rem] font-normal tracking-[0.04em] px-5 py-2 rounded-full border backdrop-blur-[12px] cursor-pointer transition-all duration-300 ${active === i
                ? "bg-col-primary text-col-bg border-col-primary font-medium"
                : "border-col-line/70 bg-col-surface/50 text-col-tertiary hover:text-col-primary hover:bg-col-surface/80"
                }`}
            >{t}</button>
          ))}
        </div>

        {/* Case panel */}
        <div className="reveal delay-4 grid gap-12 items-center grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Visual */}
          <div
            className="rounded-[18px] overflow-hidden bg-col-surface/60 border border-col-line-soft/50 relative flex items-center justify-center backdrop-blur-[16px] shadow-[0_4px_32px_var(--shadow)] transition-transform duration-500 hover:scale-[1.01]"
            style={{ aspectRatio: "4/3" }}
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 12px, hsl(215 8% 84%) 12px, hsl(215 8% 84%) 13px)" }} />
            <div className="absolute top-4 left-4 right-4 h-[22px] rounded-[6px] bg-[hsl(210_8%_88%/0.8)] border border-col-line/70 flex items-center gap-[5px] px-[10px] backdrop-blur-[8px]">
              <div className="w-[7px] h-[7px] rounded-full bg-[hsl(0_40%_65%)]" />
              <div className="w-[7px] h-[7px] rounded-full bg-[hsl(40_40%_65%)]" />
              <div className="w-[7px] h-[7px] rounded-full bg-[hsl(120_25%_58%)]" />
            </div>
            <div className="relative z-[1] font-mono text-[0.68rem] text-col-dim text-center leading-[1.6]">{c.visualLabel}</div>
            <div className="absolute bottom-5 right-5 bg-[hsl(210_10%_96%/0.75)] border border-col-line/70 rounded-[10px] px-[14px] py-[10px] backdrop-blur-[16px] shadow-[0_2px_12px_var(--shadow)]">
              <p className="text-[0.6rem] tracking-[0.1em] uppercase text-col-dim">{c.badge.p}</p>
              <span className="text-[1.1rem] font-medium text-col-primary block mt-[2px]">{c.badge.span}</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[0.62rem] tracking-[0.2em] uppercase text-col-warm font-medium mb-4">{c.cat}</p>
            <h3 className="text-[clamp(1.5rem,6vw,2.4rem)] font-normal tracking-[-0.03em] leading-[1.1] mb-5 text-col-primary">{c.title}</h3>
            <p className="text-[0.88rem] text-col-tertiary leading-[1.75] mb-7 font-normal">{c.desc}</p>
            <div className="flex flex-wrap gap-6 md:gap-8 mb-8 py-5 border-t border-b border-col-line/70">
              {c.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-[1.5rem] font-medium tracking-[-0.02em] text-col-primary leading-none">{m.val}</div>
                  <div className="text-[0.68rem] text-col-dim mt-1 tracking-[0.05em]">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-[6px] mb-8">{c.tags.map(t => <Tag key={t} label={t} />)}</div>
            <Link to="/case-study" className="inline-flex items-center gap-[10px] text-[0.75rem] font-medium tracking-[0.1em] uppercase text-col-secondary no-underline border-b border-col-line/70 pb-1 transition-all duration-300 hover:text-col-primary hover:gap-[14px]">
              View case study <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Mini grid */}
        <div className="reveal delay-5 grid gap-3 mt-12 pt-8 border-t border-col-line/70 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {cases.map((cc, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-[12px] overflow-hidden bg-col-surface/60 border backdrop-blur-[12px] relative cursor-pointer transition-all duration-300 hover:shadow-[0_4px_20px_var(--shadow-lg)] hover:-translate-y-[2px] ${active === i ? "border-col-secondary shadow-[0_2px_16px_var(--shadow)]" : "border-col-line-soft/50"}`}
              style={{ aspectRatio: "3/2" }}
            >
              <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 8px, hsl(215 8% 82%) 8px, hsl(215 8% 82%) 9px)" }} />
              <p className={`absolute bottom-2 left-[10px] text-[0.58rem] tracking-[0.1em] uppercase font-normal ${active === i ? "text-col-secondary" : "text-col-dim"}`}>{cc.mini}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
