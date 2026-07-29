import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs: { q: string; a: React.ReactNode }[] = [
  { q: "How long does a typical project take?", a: <>Starter projects run 4–6 weeks. Growth engagements run 8–12 weeks. Enterprise scopes vary — we'll give you a precise timeline after the discovery phase. We've never missed a deadline we committed to.</> },
  { q: "What tech stack do you work with?", a: <>Our primary stack is <em>React / Next.js / TypeScript</em> on the frontend, Node.js or Python on the backend, and AWS or Vercel for infrastructure. For Web3 we use Solidity + Hardhat. For AI we work with OpenAI, Anthropic, and LangChain.</> },
  { q: "Do you sign NDAs and handle IP assignment?", a: <>Yes — always. We sign NDAs before any discovery session and full IP assignment is included in all Growth and Enterprise contracts. Everything we build for you is yours from day one.</> },
  { q: "How many revisions are included?", a: <>Starter plans include 2 structured revision rounds. Growth and Enterprise plans include unlimited revisions — we iterate until the work is right. We've never had a client unhappy at handoff.</> },
  { q: "Can you work with our existing team?", a: <>Absolutely — we embed into client teams regularly. We'll work inside your repos, attend your standups, and integrate with your tooling (Jira, Linear, Notion, Slack).</> },
  { q: "What happens after launch?", a: <>All projects include a post-launch hypercare period (30 days for Starter, 60 for Growth). We monitor, fix issues, and stay available. After that, most clients move to a retainer — or call us back for the next phase.</> },
  { q: "Do you work with early-stage startups?", a: <>Yes — roughly half our clients are pre-Series A. We're used to working fast under constraints, building for scale from the start, and making technical decisions that don't need to be undone later.</> },
];

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="py-[70px] pb-[90px] md:py-[120px] md:pb-[140px] relative section-transparent"
      id="faq"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        <p className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
          <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />Support
        </p>

        <div className="grid gap-12 lg:gap-16 items-start grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left — heading + accordion */}
          <div>
            <h2 className="reveal delay-1 text-[clamp(1.8rem,7vw,3.6rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary max-w-[480px] mb-[14px]">
              Every question,<br /><em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">answered</em> plainly
            </h2>
            <p className="reveal delay-2 text-[0.88rem] text-col-tertiary leading-[1.7] font-normal mb-[52px] max-w-[400px]">
              No fluff, no vague promises — just straight answers to what teams ask us most before they commit.
            </p>

            <div className="reveal delay-3 flex flex-col">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="border-b border-col-line/70 last:border-none"
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer bg-transparent border-none"
                  >
                    <span className={`text-[0.9rem] font-normal leading-[1.4] transition-colors duration-300 ${open === i ? "text-col-primary" : "text-col-tertiary"}`}>
                      {f.q}
                    </span>
                    <span className={`flex-shrink-0 w-[22px] h-[22px] rounded-full border border-col-line/70 flex items-center justify-center transition-all duration-300 ${open === i ? "bg-col-primary border-col-primary rotate-45" : "bg-col-surface/60"}`}>
                      <svg viewBox="0 0 24 24" className={`w-[10px] h-[10px] fill-none stroke-2 [stroke-linecap:round] transition-colors duration-300 ${open === i ? "stroke-col-bg" : "stroke-col-tertiary"}`}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-[400ms] [cubic-bezier(0.4,0,0.2,1)]"
                    style={{ maxHeight: open === i ? "200px" : "0px", opacity: open === i ? 1 : 0 }}
                  >
                    <p className="text-[0.84rem] text-col-tertiary leading-[1.75] font-normal pb-5 pr-8">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact card + stats */}
          <div className="reveal-right delay-2 flex flex-col gap-4 relative lg:sticky top-20">
            {/* Contact card */}
            <div
              className="rounded-[22px] border border-col-line-soft/50 bg-[hsl(210_8%_96%/0.55)] px-8 py-9 flex flex-col backdrop-blur-[20px]"
              style={{ boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 var(--glow)" }}
            >
              <h3 className="text-[1.5rem] font-normal tracking-[-0.025em] leading-[1.2] mb-4 text-col-primary">
                Still have<br /><em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">questions?</em>
              </h3>
              <p className="text-[0.84rem] text-col-tertiary leading-[1.7] font-normal mb-7">
                Our team responds within 4 hours on weekdays. A 30-minute scoping call is always free — no obligation, no hard sell.
              </p>
              <a
                href="#"
                className="block text-center font-['Syne'] text-[0.82rem] font-medium tracking-[0.06em] uppercase py-[14px] px-5 rounded-full bg-col-primary text-col-bg no-underline mb-3 transition-all duration-300 hover:opacity-85"
              >
                Book a free call
              </a>
              <a
                href="#"
                className="block text-center font-['Syne'] text-[0.82rem] font-medium tracking-[0.04em] py-[13px] px-5 rounded-full border border-col-line/70 bg-col-surface/50 text-col-secondary no-underline mb-7 transition-all duration-300 hover:bg-col-surface/90"
              >
                Send us a message
              </a>
              <div className="flex items-center gap-[10px] pt-5 border-t border-col-line/70">
                <div className="w-2 h-2 rounded-full bg-[hsl(150_55%_50%)] flex-shrink-0" />
                <p className="text-[0.74rem] text-col-tertiary leading-[1.5]">
                  We're online — average response <strong className="text-col-primary font-medium">&lt; 4 hours</strong>
                </p>
              </div>
            </div>

            {/* Mini stats card */}
            <div
              className="rounded-[22px] border border-col-line-soft/50 bg-[hsl(210_8%_96%/0.55)] px-7 py-6 flex flex-wrap gap-6 md:gap-4 md:flex-nowrap justify-between backdrop-blur-[20px]"
              style={{ boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 var(--glow)" }}
            >
              {[
                { val: <>50<em className="font-pacifico not-italic text-[0.7em] text-col-warm">+</em></>, label: "projects delivered" },
                { val: <>98<em className="font-pacifico not-italic text-[0.7em] text-col-warm">%</em></>, label: "on-time delivery" },
                { val: <>4<em className="font-pacifico not-italic text-[0.7em] text-col-warm">h</em></>, label: "avg. response time" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[1.6rem] font-light tracking-[-0.03em] leading-none text-col-primary mb-1">{s.val}</div>
                  <div className="text-[0.62rem] tracking-[0.06em] text-col-dim font-normal">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
