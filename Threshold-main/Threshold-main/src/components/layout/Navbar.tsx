import { useEffect, useState } from "react";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? window.scrollY / docH : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />

      <nav className="fixed top-0 left-0 right-0 z-[200]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-6 md:px-12">
          <a href="#" className="flex items-center gap-2 no-underline z-[201]">
            <div className="w-5 h-5 rounded-full bg-col-primary flex-shrink-0 shadow-[0_1px_4px_var(--shadow-lg)]" />
            <div className="text-[1.1rem] leading-none">
              <span className="font-extrabold text-col-primary tracking-[-0.02em]">
                Thres
              </span>
              <span className="font-pacifico text-col-tertiary">hold</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-7 border border-col-line/70 bg-col-surface/55 backdrop-blur-[24px] rounded-full px-6 py-2 shadow-[0_2px_16px_var(--shadow),inset_0_1px_0_var(--glow)]">
            {["services", "work", "process", "pricing", "faq"].map((href) => (
              <a
                key={href}
                href={`#${href}`}
                className="text-[0.8rem] text-col-tertiary no-underline font-normal capitalize hover:text-col-primary transition-colors duration-300"
              >
                {href.charAt(0).toUpperCase() + href.slice(1)}
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <a
              href="#cta"
              className="text-[0.8rem] font-medium px-[22px] py-[9px] rounded-full bg-col-primary text-col-bg no-underline transition-all duration-300 shadow-[0_2px_12px_var(--shadow-lg)] hover:opacity-80 hover:shadow-[0_4px_20px_var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a project
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[201] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-col-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[5px]" : "-translate-y-1"}`} />
            <span className={`block w-6 h-0.5 bg-col-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-6 h-0.5 bg-col-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : "translate-y-1"}`} />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div className={`fixed inset-0 bg-col-bg/95 backdrop-blur-md z-[200] flex flex-col items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="flex flex-col items-center gap-8">
            {["services", "work", "process", "pricing", "faq"].map((href) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-col-primary no-underline font-medium capitalize"
              >
                {href.charAt(0).toUpperCase() + href.slice(1)}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 text-[1rem] font-medium px-8 py-3 rounded-full bg-col-primary text-col-bg no-underline transition-all duration-300 shadow-[0_2px_12px_var(--shadow-lg)]"
            >
              Start a project
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
