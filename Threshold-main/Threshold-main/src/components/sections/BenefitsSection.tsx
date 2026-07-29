import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const BIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-10 rounded-[10px] border border-col-line/70 bg-[hsl(210_8%_97%/0.8)] flex items-center justify-center mb-5 flex-shrink-0 shadow-[0_1px_6px_var(--shadow)] group-hover:[&_svg]:stroke-col-primary">
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-col-tertiary fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] transition-colors duration-300">
      {children}
    </svg>
  </div>
);

const BenefitsSection = () => {
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false, false, false]);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>("[data-benefit]");
    if (!cards) return;
    cards.forEach((c) => {
      if (c.getBoundingClientRect().top < window.innerHeight) {
        const i = parseInt(c.dataset.benefit || "0");
        setVisible((v) => { const n = [...v]; n[i] = true; return n; });
      }
    });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const i = parseInt(el.dataset.benefit || "0");
          const delay = parseInt(el.dataset.delay || "0");
          setTimeout(() => setVisible((v) => { const n = [...v]; n[i] = true; return n; }), delay);
          obs.unobserve(el);
        }
      }),
      { threshold: 0.08 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const cardBase = "bg-[hsl(210_8%_96%/0.55)] border border-col-line-soft/50 rounded-[20px] p-8 relative overflow-hidden backdrop-blur-[20px] transition-all duration-[400ms] group hover:-translate-y-1";
  const cardShadow = "0 2px 16px var(--shadow), inset 0 1px 0 var(--glow)";
  const cardShadowHover = "0 8px 36px var(--shadow-lg), inset 0 1px 0 var(--glow)";

  const sectionRef = useReveal<HTMLElement>();

  return (
    <section className="py-[70px] pb-[90px] md:py-[120px] md:pb-[140px] section-transparent relative" ref={(el) => { (ref as React.MutableRefObject<HTMLElement | null>).current = el; (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el; }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        <p className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
          <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />Why Threshold
        </p>
        <div className="grid gap-12 items-end mb-[72px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <h2 className="reveal delay-1 text-[clamp(1.8rem,7vw,3.6rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary">
            Built different,<br />delivered <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">right</em>
          </h2>
          <p className="reveal delay-2 text-[0.88rem] text-col-tertiary leading-[1.7] font-normal max-w-[380px]">
            Six principles that govern everything we ship — not aspirations, but non-negotiables baked into every project from day one.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {/* Featured — spans 2 cols */}
          <div
            data-benefit="0" data-delay="0"
            className={`${cardBase} lg:col-span-2 grid gap-8 items-center bg-[hsl(210_8%_92%/0.65)] transition-[opacity,transform,box-shadow] grid-cols-1 sm:grid-cols-2 ${visible[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ boxShadow: cardShadow }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = cardShadowHover)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardShadow)}
          >
            <div>
              <BIcon><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13L8 3 5 6l2 2" /></BIcon>
              <h3 className="text-[1.1rem] font-normal tracking-[-0.02em] leading-[1.2] mb-[10px] text-col-primary">Design-<em className="font-pacifico not-italic text-[0.9em] text-col-tertiary">led</em></h3>
              <p className="text-[0.82rem] text-col-tertiary leading-[1.7] font-normal">Design isn't decoration — it's strategy. Every interface decision maps back to user goals and business outcomes. We lead with design thinking before a single line of code.</p>
            </div>
            <div>
              <div className="text-[clamp(2.4rem,8vw,4.5rem)] font-light tracking-[-0.04em] leading-none mb-2 text-col-primary"><AnimatedCounter to={97} className="" suffix="%" /></div>
              <p className="text-[0.78rem] text-col-tertiary leading-[1.5] max-w-[200px]">of our clients rate design quality as the primary reason they chose us</p>
            </div>
          </div>

          {/* Tall — spans 2 rows */}
          <div
            data-benefit="1" data-delay="80"
            className={`${cardBase} lg:row-span-2 md:col-span-2 lg:col-span-1 flex flex-col justify-between transition-[opacity,transform,box-shadow] ${visible[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ boxShadow: cardShadow }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = cardShadowHover)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardShadow)}
          >
            <div>
              <BIcon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></BIcon>
              <h3 className="text-[1.1rem] font-normal tracking-[-0.02em] leading-[1.2] mb-[10px] text-col-primary">Security-<em className="font-pacifico not-italic text-[0.9em] text-col-tertiary">first</em></h3>
              <p className="text-[0.82rem] text-col-tertiary leading-[1.7] font-normal">Security isn't a phase — it's a posture. Threat modelling, OWASP compliance, penetration testing, and zero-trust architecture are standard across every engagement.</p>
            </div>
            <div className="flex gap-5 pt-5 border-t border-col-line/70 mt-6">
              <div><div className="text-[1.3rem] font-normal tracking-[-0.02em] text-col-primary">0<em className="font-pacifico not-italic text-[0.75em] text-col-title">✓</em></div><div className="text-[0.62rem] text-col-dim tracking-[0.05em] mt-[2px]">critical breaches post-launch</div></div>
              <div><div className="text-[1.3rem] font-normal tracking-[-0.02em] text-col-primary">100<em className="font-pacifico not-italic text-[0.75em] text-col-title">%</em></div><div className="text-[0.62rem] text-col-dim tracking-[0.05em] mt-[2px]">audits passed first attempt</div></div>
            </div>
          </div>

          {/* Regular cards */}
          {[
            { i: 2, delay: 160, title: <><em className="font-pacifico not-italic text-[0.9em] text-col-tertiary">AI</em>-native</>, desc: "We don't bolt AI on afterwards — we architect for it from the start. Custom LLM integrations, agentic workflows, and intelligent automation native to your stack.", icon: <><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></> },
            { i: 3, delay: 220, title: <>Performance-<em className="font-pacifico not-italic text-[0.9em] text-col-tertiary">obsessed</em></>, desc: "Sub-second load times, 99+ Lighthouse scores, and edge-optimised deployments. Speed is a feature — one we never compromise on.", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
            { i: 4, delay: 300, title: <>Fully <em className="font-pacifico not-italic text-[0.9em] text-col-tertiary">transparent</em></>, desc: "Daily updates, staging previews, and open project boards. You always know exactly where your project stands — no black boxes, no surprises at invoice time.", icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></> },
            { i: 5, delay: 360, title: <>Built to <em className="font-pacifico not-italic text-[0.9em] text-col-tertiary">scale</em></>, desc: "Architecture decisions made for where you're going, not just where you are. Modular codebases, design systems, and infra that grows with your ambition without a rewrite.", icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></> },
          ].map(({ i, delay, title, desc, icon }) => (
            <div
              key={i}
              data-benefit={i} data-delay={delay}
              className={`${cardBase} transition-[opacity,transform,box-shadow] ${visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ boxShadow: cardShadow }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = cardShadowHover)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardShadow)}
            >
              <BIcon>{icon}</BIcon>
              <h3 className="text-[1.1rem] font-normal tracking-[-0.02em] leading-[1.2] mb-[10px] text-col-primary">{title}</h3>
              <p className="text-[0.82rem] text-col-tertiary leading-[1.7] font-normal">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between mt-12 pt-10 border-t border-col-line/70">
          <p className="text-[0.84rem] text-col-tertiary">
            <strong className="text-col-primary font-medium">Ready to work with a team that holds itself to this standard?</strong><br />Every project. No exceptions.
          </p>
          <a href="#cta" className="inline-flex items-center gap-[10px] text-[0.78rem] font-medium tracking-[0.08em] uppercase text-col-bg bg-col-primary no-underline px-6 py-3 rounded-full transition-all duration-300 hover:opacity-80 hover:gap-[14px] shadow-[0_2px_16px_var(--shadow-lg)]">
            Start a project
            <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] stroke-current fill-none stroke-2 [stroke-linecap:round]"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
