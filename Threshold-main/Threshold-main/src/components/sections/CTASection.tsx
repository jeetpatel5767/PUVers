import bgVideo from "@/assets/BG.mp4";
import { useReveal } from "@/hooks/useReveal";

const CTASection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="py-[70px] md:py-[120px] px-6 md:px-12 relative section-transparent"
      id="cta"
    >
      <div
        className="reveal-scale max-w-[1280px] mx-auto relative overflow-hidden bg-col-surface/40 border border-col-line-soft/50 rounded-[28px] p-8 md:p-16 lg:p-24 backdrop-blur-xl"
        style={{ boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 var(--glow)" }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Dark Overlay for readability - keeping it dark since text is white */}
        {/* <div className="absolute inset-0 bg-black/40 z-0" /> */}

        {/* Glow Orb - matching Features section */}
        <div className="absolute w-[200px] h-[200px] rounded-full bg-[hsl(210_20%_95%)] blur-[60px] pointer-events-none top-[-40px] right-[-40px] opacity-40 z-0" />

        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 cta-noise opacity-10 pointer-events-none z-0" />

        <div className="relative z-[1] flex flex-col items-center text-center max-w-[680px] mx-auto">
          <p className="reveal delay-1 text-[0.62rem] tracking-[0.28em] uppercase text-col-primary mb-6 font-normal">
            Ready to begin
          </p>
          <h2 className="reveal delay-2 text-[clamp(1.8rem,8vw,4.2rem)] font-normal tracking-[-0.035em] leading-[1.08] text-white mb-6">
            Let's build something<br />
            <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title/90">exceptional</em>{" "}
            <span className="text-white">together</span>
          </h2>
          <p className="reveal delay-3 text-[0.95rem] text-col-secondary leading-[1.75] font-normal mb-10 max-w-[480px]">
            Tell us what you're building. We'll tell you exactly how we can help — and if we can't, we'll say so.
          </p>
          <div className="reveal delay-4 flex items-center gap-4 flex-wrap justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-[10px] font-['Syne'] text-[0.82rem] font-medium tracking-[0.08em] uppercase py-[14px] px-7 rounded-full bg-col-primary text-col-bg no-underline transition-all duration-300 hover:opacity-90 hover:gap-[14px] hover:scale-[1.03] active:scale-[0.97] shadow-[0_4px_24px_var(--shadow-lg)]"
            >
              Start a project
              <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] stroke-current fill-none stroke-2 [stroke-linecap:round]">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-[10px] font-['Syne'] text-[0.82rem] font-medium tracking-[0.08em] uppercase py-[13px] px-7 rounded-full border border-col-line/70 text-col-secondary no-underline transition-all duration-300 hover:bg-col-surface/90 hover:gap-[14px] backdrop-blur-sm"
            >
              Book a free call
              <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] stroke-current fill-none stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.19 12 19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
