import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

type Bill = "project" | "retainer";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] flex-shrink-0 stroke-col-warm fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] mt-[1px]">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const FeaturedCheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] flex-shrink-0 fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] mt-[1px]" style={{ stroke: "hsl(215 8% 46%)" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none stroke-2 [stroke-linecap:round]">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const cardShadow = "0 2px 20px var(--shadow), inset 0 1px 0 var(--glow)";
const cardShadowHover = "0 8px 40px var(--shadow-lg), inset 0 1px 0 var(--glow)";

const PricingSection = () => {
  const [bill, setBill] = useState<Bill>("project");

  const period = bill === "project" ? "one-time project" : "/ month";
  const starter = bill === "project" ? <>8<em className="font-pacifico not-italic text-[0.45em] font-normal opacity-50">k</em></> : <>2<em className="font-pacifico not-italic text-[0.45em] font-normal opacity-50">k</em></>;
  const growth  = bill === "project" ? <>24<em className="font-pacifico not-italic text-[0.45em] font-normal opacity-50">k</em></> : <>6<em className="font-pacifico not-italic text-[0.45em] font-normal opacity-50">k</em></>;

  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="py-[70px] pb-[90px] md:py-[120px] md:pb-[140px] relative section-transparent"
      id="pricing"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        <p className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
          <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />Investment
        </p>
        <h2 className="reveal delay-1 text-[clamp(1.8rem,7vw,3.6rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary max-w-[600px] mb-[14px]">
          pricing that reflects<br />the <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">value</em> we deliver
        </h2>
        <p className="reveal delay-2 text-[0.88rem] text-col-tertiary leading-[1.7] font-normal max-w-[440px] mb-[52px]">
          Three engagement models designed around how teams actually work — from focused projects to long-term partnerships.
        </p>

        {/* Billing toggle */}
        <div className="reveal delay-3 flex items-center gap-4 mb-[52px]">
          {(["project","retainer"] as Bill[]).map((b) => (
            <button
              key={b}
              onClick={() => setBill(b)}
              className={`font-['Syne'] text-[0.76rem] font-normal px-[18px] py-[7px] rounded-full border backdrop-blur-[12px] cursor-pointer transition-all duration-300 ${bill === b ? "bg-col-primary text-col-bg border-col-primary font-medium" : "border-col-line/70 bg-col-surface/50 text-col-tertiary"}`}
            >
              {b === "project" ? "Project" : <>Retainer <span className="text-[0.6rem] tracking-[0.08em] px-[9px] py-[3px] rounded-full bg-[hsl(30_10%_88%)] text-col-warm border border-col-line/70">Save 20%</span></>}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="reveal delay-4 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-start">
          {/* Starter */}
          <div
            className="rounded-[22px] border border-col-line-soft/50 bg-[hsl(210_8%_96%/0.55)] px-8 py-9 flex flex-col relative overflow-hidden backdrop-blur-[20px] transition-all duration-[400ms] hover:-translate-y-1"
            style={{ boxShadow: cardShadow }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = cardShadowHover)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardShadow)}
          >
            <span className="inline-block text-[0.62rem] font-normal tracking-[0.12em] uppercase px-[10px] py-1 rounded-full bg-[hsl(210_8%_90%/0.7)] text-col-tertiary mb-5 border border-col-line/70 self-start">Starter</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[1.1rem] font-normal opacity-50 self-start mt-2">$</span>
              <span className="text-[clamp(2.4rem,8vw,3.6rem)] font-light tracking-[-0.04em] leading-none text-col-primary">{starter}</span>
            </div>
            <p className="text-[0.78rem] text-col-tertiary mb-4">{period}</p>
            <p className="text-[0.82rem] text-col-tertiary leading-[1.6] font-normal mb-6">Ideal for startups and MVPs — a focused engagement to design and ship one core product or feature.</p>
            <a href="#" className="block text-center font-['Syne'] text-[0.8rem] font-medium tracking-[0.04em] py-3 px-5 rounded-full border border-col-line/70 bg-[hsl(210_8%_94%/0.6)] text-col-primary no-underline mb-7 transition-all duration-300 hover:bg-col-surface/90 hover:shadow-[0_2px_12px_var(--shadow)]">Start a project</a>
            <div className="h-px bg-col-line/70 mb-6" />
            <ul className="flex flex-col gap-3 mt-auto list-none p-0">
              {["Up to 6-week timeline","1 core service (Design or Dev)","Weekly progress updates","2 rounds of revisions","30-day post-launch support"].map(f => (
                <li key={f} className="flex items-start gap-[10px] text-[0.8rem] text-col-tertiary leading-[1.4] font-normal"><CheckIcon />{f}</li>
              ))}
            </ul>
          </div>

          {/* Growth — featured */}
          <div
            className="rounded-[22px] border border-[hsl(220_8%_30%)] bg-col-primary px-8 py-9 flex flex-col relative overflow-hidden lg:-translate-y-3 transition-all duration-[400ms] hover:-translate-y-1 lg:hover:-translate-y-4"
            style={{ boxShadow: "0 8px 48px var(--shadow-lg)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 56px hsl(220 12% 50% / 0.22)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 48px var(--shadow-lg)")}
          >
            <div className="absolute top-5 right-5 text-[0.58rem] font-medium tracking-[0.12em] uppercase px-[10px] py-1 rounded-full shimmer text-col-secondary">Most popular</div>
            <span className="inline-block text-[0.62rem] font-normal tracking-[0.12em] uppercase px-[10px] py-1 rounded-full bg-[hsl(215_8%_88%)] text-col-secondary mb-5 self-start">Growth</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[1.1rem] font-normal opacity-50 self-start mt-2 text-col-bg">$</span>
              <span className="text-[clamp(2.4rem,8vw,3.6rem)] font-light tracking-[-0.04em] leading-none text-col-bg">{growth}</span>
            </div>
            <p className="text-[0.78rem] mb-4" style={{ color: "hsl(215 8% 52%)" }}>{period}</p>
            <p className="text-[0.82rem] leading-[1.6] font-normal mb-6" style={{ color: "hsl(215 8% 52%)" }}>For teams ready to build something complete — full-stack product with design, engineering, and AI capabilities.</p>
            <a href="#" className="block text-center font-['Syne'] text-[0.8rem] font-medium tracking-[0.04em] py-3 px-5 rounded-full bg-[hsl(215_8%_88%)] text-col-primary no-underline mb-7 transition-all duration-300 hover:opacity-90">Start a project</a>
            <div className="h-px mb-6" style={{ background: "hsl(215 8% 82%)" }} />
            <ul className="flex flex-col gap-3 mt-auto list-none p-0">
              {["Up to 12-week timeline","Full stack — Design + Dev + AI","Daily updates + staging access","Unlimited revisions","Security review included","60-day post-launch hypercare"].map(f => (
                <li key={f} className="flex items-start gap-[10px] text-[0.8rem] leading-[1.4] font-normal" style={{ color: "hsl(215 8% 52%)" }}><FeaturedCheckIcon />{f}</li>
              ))}
            </ul>
          </div>

          {/* Enterprise */}
          <div
            className="rounded-[22px] border border-col-line-soft/50 bg-[hsl(210_8%_96%/0.55)] px-8 py-9 flex flex-col relative overflow-hidden backdrop-blur-[20px] transition-all duration-[400ms] hover:-translate-y-1"
            style={{ boxShadow: cardShadow }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = cardShadowHover)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardShadow)}
          >
            <span className="inline-block text-[0.62rem] font-normal tracking-[0.12em] uppercase px-[10px] py-1 rounded-full bg-[hsl(210_8%_90%/0.7)] text-col-tertiary mb-5 border border-col-line/70 self-start">Enterprise</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[2.4rem] font-light tracking-[-0.04em] leading-none text-col-primary">Custom</span>
            </div>
            <p className="text-[0.78rem] text-col-tertiary mb-4">scoped to your needs</p>
            <p className="text-[0.82rem] text-col-tertiary leading-[1.6] font-normal mb-6">Complex, multi-team engagements — Web3 protocols, enterprise AI systems, or large-scale security programmes.</p>
            <a href="#" className="block text-center font-['Syne'] text-[0.8rem] font-medium tracking-[0.04em] py-3 px-5 rounded-full border border-col-line/70 bg-[hsl(210_8%_94%/0.6)] text-col-primary no-underline mb-7 transition-all duration-300 hover:bg-col-surface/90 hover:shadow-[0_2px_12px_var(--shadow)]">Talk to us</a>
            <div className="h-px bg-col-line/70 mb-6" />
            <ul className="flex flex-col gap-3 mt-auto list-none p-0">
              {["Dedicated project team","All 5 service areas","NDA + IP assignment","Full penetration testing","SLA guarantees","Ongoing retainer option"].map(f => (
                <li key={f} className="flex items-start gap-[10px] text-[0.8rem] text-col-tertiary leading-[1.4] font-normal"><CheckIcon />{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enterprise note */}
        <div className="reveal mt-10 px-7 py-6 rounded-[14px] border border-col-line-soft/50 bg-[hsl(210_8%_94%/0.6)] flex items-center justify-between gap-6 backdrop-blur-[16px] shadow-[0_2px_16px_var(--shadow)]">
          <p className="text-[0.84rem] text-col-tertiary leading-[1.5]">
            <strong className="text-col-primary font-medium">Not sure which fits?</strong> Every engagement starts with a free 30-minute scoping call — we'll tell you exactly what you need, even if it's not us.
          </p>
          <a href="#" className="text-[0.76rem] font-medium text-col-secondary no-underline whitespace-nowrap flex items-center gap-2 border-b border-col-line/70 pb-[2px] transition-all duration-300 hover:text-col-primary hover:gap-3">
            Book a call <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
