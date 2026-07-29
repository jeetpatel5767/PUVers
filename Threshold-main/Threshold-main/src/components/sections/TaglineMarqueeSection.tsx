import { useReveal } from "@/hooks/useReveal";

const techItems = [
  { name: "Figma", accent: true },
  { name: "React", accent: false },
  { name: "Next.js", accent: false },
  { name: <span>Web<em className="font-pacifico not-italic text-[0.85em]">3</em></span>, accent: true },
  { name: "OpenAI", accent: false },
  { name: "Solidity", accent: false },
  { name: "TypeScript", accent: true },
  { name: "Tailwind", accent: false },
  { name: "Rust", accent: false },
  { name: "AWS", accent: false },
  { name: "Framer", accent: true },
  { name: "Supabase", accent: false },
];

const TaglineMarqueeSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section-transparent py-[70px] pb-[40px] md:py-[100px] md:pb-[60px] relative">
      {/* Tagline strip */}
      <div className="max-w-[1280px] mx-auto px-12 text-center mb-16">
        <p className="reveal text-[0.62rem] tracking-[0.28em] uppercase text-col-dim font-normal mb-6">
          Trusted by forward-thinking teams
        </p>
        <h2 className="reveal delay-1 text-[clamp(1.8rem,8vw,3.8rem)] font-normal tracking-[-0.03em] leading-[1.1] text-col-primary">
          Crafting{" "}
          <em className="font-pacifico not-italic font-normal text-[0.9em] text-col-title">
            digital
          </em>
          <br />
          experiences that matter
        </h2>
      </div>

      {/* Marquee */}
      <div className="reveal delay-2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center">
              {techItems.map((item, i) => (
                <div
                  key={`${rep}-${i}`}
                  className="flex items-center"
                >
                  <div className="flex items-center gap-3 px-10 py-4">
                    <span className="w-1 h-1 rounded-full bg-col-warm flex-shrink-0" />
                    <span className="text-[0.78rem] tracking-[0.12em] uppercase whitespace-nowrap font-normal text-col-tertiary">
                      {item.name}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-col-line flex-shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaglineMarqueeSection;
