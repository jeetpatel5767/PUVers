import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const cardShadow = "0 2px 20px var(--shadow), inset 0 1px 0 var(--glow)";
const cardShadowHover = "0 8px 40px var(--shadow-lg), inset 0 1px 0 var(--glow)";

interface CardProps {
  children: React.ReactNode;
  featured?: boolean;
  wide?: boolean;
  delay?: number;
  className?: string;
}

const Card = ({ children, featured, wide, delay = 0, className = "" }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        bg-col-surface/60 border border-col-line-soft/50 rounded-[20px] p-9
        relative overflow-hidden cursor-default backdrop-blur-[20px]
        transition-all duration-[600ms]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}
        ${hovered ? "-translate-y-1" : ""}
        ${featured ? "flex flex-col justify-between min-h-[480px] bg-[hsl(210_8%_90%/0.7)] lg:col-start-1 lg:row-span-2" : ""}
        ${wide ? "md:col-span-2 lg:[grid-column:2/4] lg:[grid-row:2]" : ""}
        ${className}
      `}
      style={{ boxShadow: hovered ? cardShadowHover : cardShadow }}
    >
      {/* glow orb */}
      <div
        className={`absolute w-[200px] h-[200px] rounded-full bg-[hsl(210_20%_95%)] blur-[60px] pointer-events-none top-[-40px] right-[-40px] transition-opacity duration-[600ms] ${hovered || featured ? "opacity-50" : "opacity-0"}`}
      />
      {children}
    </div>
  );
};

const CardNum = ({ n }: { n: string }) => (
  <p className="text-[0.62rem] tracking-[0.22em] text-col-dim font-normal mb-10">{n}</p>
);
const CardIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-10 rounded-[10px] border border-col-line/70 bg-col-surface/80 flex items-center justify-center mb-5 flex-shrink-0 shadow-[0_1px_6px_var(--shadow)]">
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-col-secondary fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]">
      {children}
    </svg>
  </div>
);
const Tag = ({ label }: { label: string }) => (
  <span className="text-[0.6rem] tracking-[0.08em] uppercase px-[10px] py-1 rounded-full border border-col-line/70 bg-col-surface/60 text-col-dim font-normal">
    {label}
  </span>
);

const FeaturesSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-[70px] pb-[90px] md:py-[120px] md:pb-[140px] section-transparent relative" id="services">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        <p className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
          <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />
          What we build
        </p>
        <h2 className="reveal delay-1 text-[clamp(1.8rem,7vw,3.6rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary max-w-[600px] mb-4">
          Your vision,<br />executed <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">flawlessly</em>
        </h2>
        <p className="reveal delay-2 text-[0.88rem] text-col-tertiary leading-[1.7] font-normal max-w-[420px] mb-[72px]">
          We design, build, and ship digital products that perform — from first pixel to final deployment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-4">
          {/* Featured */}
          <Card featured delay={0}>
            <div>
              <CardNum n="01" />
              <div className="w-7 h-px bg-col-warm mb-8 rounded-px opacity-60" />
              <CardIcon>
                <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13L8 3 5 6l1.5 1.5" /><line x1="3" y1="22" x2="7" y2="18" />
              </CardIcon>
              <h3 className="text-[clamp(1.5rem,6vw,2rem)] font-normal tracking-[-0.02em] leading-[1.2] mb-4 text-col-primary">
                UI/UX <em className="font-pacifico not-italic font-normal text-[0.95em] text-col-tertiary">Design</em>
              </h3>
              <p className="text-[0.88rem] text-col-tertiary leading-[1.7] font-normal max-w-[320px]">
                Research-driven interfaces built for clarity and delight. We craft design systems, prototypes, and production-ready UI that converts — refined through iteration, not assumption.
              </p>
              <div className="flex flex-wrap gap-[6px] mt-5">
                {["Figma", "Design Systems", "Prototyping", "User Research"].map(t => <Tag key={t} label={t} />)}
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <a href="#" className="text-[0.7rem] tracking-[0.12em] uppercase text-col-secondary no-underline font-medium flex items-center gap-2 transition-all duration-300 hover:gap-3 hover:text-col-primary">
                Explore service
                <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] stroke-current fill-none stroke-2 [stroke-linecap:round]">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </Card>

          {/* Frontend */}
          <Card delay={100}>
            <CardNum n="02" />
            <CardIcon><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></CardIcon>
            <h3 className="text-[1.2rem] font-normal tracking-[-0.02em] leading-[1.2] mb-3 text-col-primary">
              Frontend Dev
              {/* <em className="font-pacifico not-italic font-normal text-[0.95em] text-col-tertiary">Dev</em> */}
            </h3>
            <p className="text-[0.84rem] text-col-tertiary leading-[1.7] font-normal">
              Performant, pixel-perfect interfaces built with React, Next.js, and modern web standards. Fast by default, beautiful by design.
            </p>
            <div className="flex flex-wrap gap-[6px] mt-5">{["React", "Next.js", "TypeScript"].map(t => <Tag key={t} label={t} />)}</div>
          </Card>

          {/* AI Systems */}
          <Card delay={180}>
            <CardNum n="03" />
            <CardIcon>
              <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </CardIcon>
            <h3 className="text-[1.2rem] font-normal tracking-[-0.02em] leading-[1.2] mb-3 text-col-primary">
              <em className="font-pacifico not-italic font-normal text-[0.95em] text-col-tertiary">Ai </em>Systems
            </h3>
            <p className="text-[0.84rem] text-col-tertiary leading-[1.7] font-normal">
              Custom AI integrations, LLM pipelines, and intelligent automation — built to fit your workflow, not the other way around.
            </p>
            <div className="flex flex-wrap gap-[6px] mt-5">{["OpenAI", "LLMs", "Agents"].map(t => <Tag key={t} label={t} />)}</div>
          </Card>

          {/* Wide card */}
          <Card wide delay={260}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="flex-1">
                <CardNum n="04" />
                <CardIcon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></CardIcon>
                <h3 className="text-[1.2rem] font-normal tracking-[-0.02em] leading-[1.2] mb-3 text-col-primary">
                  Cyber security
                </h3>
                <p className="text-[0.84rem] text-col-tertiary leading-[1.7] font-normal">Security-first architecture, penetration testing, and threat modelling for digital products that can't afford to fail.</p>
                <div className="flex flex-wrap gap-[6px] mt-5">{["PenTest", "Audits", "Zero-Trust"].map(t => <Tag key={t} label={t} />)}</div>
              </div>
              <div className="flex-1">
                <CardNum n="05" />
                <CardIcon><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></CardIcon>
                <h3 className="text-[1.2rem] font-normal tracking-[-0.02em] leading-[1.2] mb-3 text-col-primary">
                  Web<em className="font-pacifico not-italic font-normal text-[0.95em] text-col-tertiary">3</em> & Blockchain
                </h3>
                <p className="text-[0.84rem] text-col-tertiary leading-[1.7] font-normal">Smart contract development, dApp frontends, and tokenisation strategy — from concept to on-chain deployment.</p>
                <div className="flex flex-wrap gap-[6px] mt-5">{["Solidity", "dApps", "NFT"].map(t => <Tag key={t} label={t} />)}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
