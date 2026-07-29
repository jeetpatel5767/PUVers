import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useReveal } from "@/hooks/useReveal";

const CaseStudy = () => {
  useEffect(() => {
    document.body.classList.add("threshold-body");
    return () => document.body.classList.remove("threshold-body");
  }, []);

  const sectionRef = useReveal<HTMLElement>();

  return (
    <div className="min-h-screen relative">
      <div className="global-blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <Navbar />

      <section ref={sectionRef} className="pt-[100px] pb-[80px] md:pt-[160px] md:pb-[120px] section-transparent relative min-h-[90vh]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 relative z-[1]">
          {/* Header */}
          <div className="reveal flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-col-dim mb-5">
            <span className="inline-block w-5 h-px bg-col-warm flex-shrink-0" />
            Case Study · Logistics
          </div>
          <h1 className="reveal delay-1 text-[clamp(2.2rem,8vw,4.5rem)] font-normal tracking-[-0.03em] leading-[1.05] text-col-primary max-w-[800px] mb-8">
            Nexus <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">Dashboard</em>
          </h1>
          <p className="reveal delay-2 text-[1.1rem] text-col-tertiary leading-[1.6] font-normal max-w-[600px] mb-12">
            A real-time operations platform for a logistics company — combining AI-driven route optimisation, live tracking, and a zero-friction command interface designed for field operators.
          </p>

          <div className="reveal delay-3 flex flex-wrap gap-3 mb-16">
            {["Next.js", "TypeScript", "OpenAI", "Figma", "AWS"].map((tag) => (
              <span key={tag} className="text-[0.65rem] tracking-[0.08em] uppercase px-[12px] py-[6px] rounded-full border border-col-line/70 bg-col-surface/60 text-col-dim font-normal backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Hero Visual Mockup */}
          <div className="reveal delay-4 rounded-[24px] overflow-hidden bg-col-surface/60 border border-col-line-soft/50 relative flex items-center justify-center backdrop-blur-[16px] shadow-[0_8px_32px_var(--shadow)] aspect-[16/9] md:aspect-[21/9] mb-20 w-full group">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 12px, hsl(215 8% 84%) 12px, hsl(215 8% 84%) 13px)" }} />
            
            {/* Window chrome */}
            <div className="absolute top-4 left-4 right-4 h-[24px] rounded-[6px] bg-[hsl(210_8%_88%/0.8)] border border-col-line/70 flex items-center justify-between px-[12px] backdrop-blur-[8px]">
              <div className="flex items-center gap-[6px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[hsl(0_40%_65%)]" />
                <div className="w-[8px] h-[8px] rounded-full bg-[hsl(40_40%_65%)]" />
                <div className="w-[8px] h-[8px] rounded-full bg-[hsl(120_25%_58%)]" />
              </div>
              <div className="text-[0.55rem] tracking-[0.1em] text-col-dim font-mono uppercase bg-col-bg px-2 py-0.5 rounded border border-col-line/50">nexus-ops.app</div>
            </div>

            {/* Abstract UI Representation */}
            <div className="relative z-[1] w-[85%] h-[65%] border border-col-line/70 rounded-[12px] bg-col-bg shadow-[0_4px_24px_var(--shadow)] overflow-hidden flex flex-col mt-4 transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Fake UI Header */}
              <div className="h-10 border-b border-col-line/50 flex items-center px-4 justify-between bg-col-surface/40">
                 <div className="w-24 h-3 rounded-full bg-col-line-soft/80" />
                 <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-col-line-soft/80" />
                    <div className="w-6 h-6 rounded-full bg-col-line-soft/80" />
                 </div>
              </div>
              {/* Fake UI Content */}
              <div className="flex-1 p-4 grid grid-cols-3 gap-4">
                 <div className="col-span-2 rounded-lg bg-col-surface border border-col-line/30 flex flex-col justify-end p-4">
                    <div className="w-full h-[60%] rounded-md bg-gradient-to-t from-col-title/10 to-transparent flex items-end">
                       {/* Chart lines */}
                       <div className="w-full h-[2px] bg-col-title shadow-[0_0_8px_var(--glow)] relative overflow-hidden">
                          <div className="absolute inset-0 bg-white shimmer" />
                       </div>
                    </div>
                 </div>
                 <div className="col-span-1 flex flex-col gap-4">
                    <div className="h-1/2 rounded-lg bg-col-surface border border-col-line/30 p-3 flex flex-col justify-between">
                       <div className="w-16 h-2 rounded-full bg-col-dim/40" />
                       <div className="w-20 h-6 rounded bg-col-title/20 text-col-title text-[0.6rem] font-bold flex items-center justify-center">ACTIVE</div>
                    </div>
                    <div className="h-1/2 rounded-lg bg-col-surface border border-col-line/30 p-3 flex flex-col gap-2">
                       <div className="w-12 h-2 rounded-full bg-col-dim/40" />
                       <div className="w-full h-2 rounded-full bg-col-line-soft" />
                       <div className="w-[80%] h-2 rounded-full bg-col-line-soft" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-b border-col-line/70 mb-20">
            {[
              { val: <>3<em className="font-pacifico not-italic text-[0.8em] text-col-warm">×</em></>, label: "Faster decision-making" },
              { val: <>98<em className="font-pacifico not-italic text-[0.8em] text-col-warm">%</em></>, label: "Uptime SLA achieved" },
              { val: <>6<em className="font-pacifico not-italic text-[0.8em] text-col-warm">wk</em></>, label: "Delivered on schedule" }
            ].map((m, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-[2.5rem] font-medium tracking-[-0.02em] text-col-primary leading-none mb-2">{m.val}</div>
                <div className="text-[0.75rem] text-col-dim tracking-[0.05em] uppercase font-medium">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Details Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="sticky top-24">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-col-dim mb-4">The Challenge</p>
                <h3 className="text-[clamp(1.5rem,7vw,1.8rem)] font-normal tracking-[-0.02em] leading-[1.1] text-col-primary mb-6">
                  Legacy systems slowing down critical operations.
                </h3>
              </div>
            </div>
            <div className="md:col-span-8 text-col-secondary text-[1rem] leading-[1.8] font-normal flex flex-col gap-6">
              <p>
                The client relied on a patchwork of outdated legacy systems and manual spreadsheets to manage an extensive fleet of vehicles. Field operators spent an average of 4 hours daily cross-referencing data between disconnected platforms, leading to severe bottlenecks in dispatch times and route optimization.
              </p>
              <p>
                We were tasked with designing and building a unified, cloud-native platform that could ingest real-time telemetry from thousands of endpoints, process it through an AI-driven routing engine, and present it via a lightning-fast, zero-friction interface.
              </p>

              <div className="my-8 p-8 rounded-[16px] bg-col-surface/50 border border-col-line/50 backdrop-blur-sm">
                <p className="text-[1.2rem] font-medium text-col-primary italic leading-[1.5] mb-6">
                  "The new dashboard didn't just digitize our process; it completely reimagined how we make logistical decisions under pressure."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-col-line flex-shrink-0" />
                  <div>
                    <div className="text-[0.85rem] font-medium text-col-primary">Sarah Jenkins</div>
                    <div className="text-[0.7rem] text-col-dim uppercase tracking-[0.05em]">Director of Operations</div>
                  </div>
                </div>
              </div>

              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-col-dim mb-2 mt-4">The Solution</p>
              <h3 className="text-[clamp(1.5rem,7vw,1.8rem)] font-normal tracking-[-0.02em] leading-[1.1] text-col-primary mb-4">
                Edge computing & actionable AI
              </h3>
              <p>
                By moving rendering to the edge using Next.js and Vercel, we achieved sub-second load times globally. The interface was completely redesigned in Figma, focusing on cognitive load reduction. We implemented a unified 'Command Center' view that surfaces anomalies automatically using OpenAI algorithms, rather than requiring operators to search for them.
              </p>
              <p>
                The result is Nexus: an intelligent layer over their operational data that actively suggests route corrections and automatically handles SLA compliance reporting.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;
