import { useReveal } from "@/hooks/useReveal";

const Footer = () => {
  const footerRef = useReveal<HTMLElement>();

  return (
    <footer ref={footerRef} className="section-transparent border-t border-col-line/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Main grid */}
        <div className="grid gap-12 py-12 md:py-16 border-b border-col-line/70 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div className="reveal">
            <div className="flex items-center gap-[7px] mb-5">
              <div className="w-[7px] h-[7px] rounded-full bg-col-warm flex-shrink-0" />
              <div className="text-[1rem] tracking-[-0.01em] font-normal text-col-primary leading-none">
                <span>Thres</span><span className="font-pacifico text-col-tertiary font-normal">hold</span>
              </div>
            </div>
            <p className="text-[0.78rem] text-col-dim leading-[1.7] font-normal max-w-[240px] mb-6">
              A premium digital agency specialising in UI/UX, frontend engineering, AI systems, cybersecurity, and Web3.
            </p>
            <div className="flex items-center gap-[10px]">
              {[
                <path key="x" d="M4 4l16 16M20 4L4 20" strokeWidth="1.6" />,
                <path key="gh" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
                <><path key="li1" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle key="li2" cx="4" cy="4" r="2" /></>,
                <><circle key="dr1" cx="12" cy="12" r="10" /><path key="dr2" d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></>,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-[34px] h-[34px] rounded-full border border-col-line/70 bg-col-surface/50 flex items-center justify-center transition-all duration-300 hover:bg-col-surface hover:shadow-[0_2px_10px_var(--shadow)] hover:-translate-y-[2px] hover:text-col-primary text-col-dim"
                >
                  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-current fill-none [stroke-linecap:round] [stroke-linejoin:round]" strokeWidth="1.6">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="reveal delay-1">
            <p className="text-[0.62rem] tracking-[0.2em] uppercase text-col-dim font-normal mb-5">Services</p>
            <div className="flex flex-col gap-[10px]">
              {[
                { label: "UI/UX Design", href: "#services" },
                { label: "Frontend Development", href: "#services" },
                { label: "AI Systems", href: "#services", badge: "New" },
                { label: "Cybersecurity", href: "#services" },
                { label: "Web3 & Blockchain", href: "#services" },
              ].map(({ label, href, badge }) => (
                <a key={label} href={href} className="text-[0.78rem] text-col-tertiary no-underline font-normal transition-all duration-300 hover:text-col-primary hover:translate-x-1 flex items-center gap-2">
                  {label}
                  {badge && <span className="text-[0.52rem] tracking-[0.1em] uppercase px-[7px] py-[2px] rounded-full bg-[hsl(30_10%_88%)] text-col-warm border border-col-line/70">{badge}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="reveal delay-2">
            <p className="text-[0.62rem] tracking-[0.2em] uppercase text-col-dim font-normal mb-5">Company</p>
            <div className="flex flex-col gap-[10px]">
              {[
                { label: "About", href: "#" },
                { label: "Work", href: "#work" },
                { label: "Process", href: "#process" },
                { label: "Pricing", href: "#pricing" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="text-[0.78rem] text-col-tertiary no-underline font-normal transition-all duration-300 hover:text-col-primary hover:translate-x-1">{label}</a>
              ))}
            </div>
          </div>

          {/* Contact + Legal */}
          <div className="reveal delay-3">
            <p className="text-[0.62rem] tracking-[0.2em] uppercase text-col-dim font-normal mb-5">Contact</p>
            <div className="flex flex-col gap-[10px] mb-7">
              {[
                { label: "hello@threshold.studio", href: "mailto:hello@threshold.studio" },
                { label: "Book a call", href: "#" },
                { label: "Start a project", href: "#cta" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="text-[0.78rem] text-col-tertiary no-underline font-normal transition-all duration-300 hover:text-col-primary hover:translate-x-1">{label}</a>
              ))}
            </div>
            <p className="text-[0.62rem] tracking-[0.2em] uppercase text-col-dim font-normal mb-5">Legal</p>
            <div className="flex flex-col gap-[10px]">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="text-[0.78rem] text-col-tertiary no-underline font-normal transition-all duration-300 hover:text-col-primary hover:translate-x-1">{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="reveal delay-4 flex items-center justify-between py-6 flex-wrap gap-4">
          <p className="text-[0.72rem] text-col-dim font-normal">
            © 2026 <em className="font-pacifico not-italic">Threshold</em> Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-[8px] text-[0.7rem] text-col-dim">
            <div className="w-[6px] h-[6px] rounded-full bg-[hsl(150_55%_50%)] flex-shrink-0 animate-pulse" />
            All systems operational
          </div>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-[0.7rem] text-col-dim no-underline transition-colors duration-300 hover:text-col-tertiary">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
