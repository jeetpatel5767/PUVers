import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HorizontalBrandSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "-290vw"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[350vh] section-transparent"
      style={{ background: "radial-gradient(ellipse 60% 40% at 80% 20%, hsl(210 12% 96%) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, hsl(215 8% 88%) 0%, transparent 55%)" }}
    >

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex items-center whitespace-nowrap">
          <div className="flex items-center gap-[3vw]">
            <div className="rounded-full bg-col-primary shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.06)]" style={{ width: "20vw", height: "20vw" }} />
            <span className="inline-flex items-baseline gap-0 leading-none" style={{ fontSize: "27vw" }}>
              <span className="font-heading font-extrabold text-col-primary">Thres</span>
              <span className="font-pacifico text-col-title">hold</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalBrandSection;
