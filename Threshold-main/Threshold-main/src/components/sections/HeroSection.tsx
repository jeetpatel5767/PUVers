import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/Hero-BG.png";
import { useEffect, useMemo, useRef, useState } from "react";

import "@fontsource/pacifico";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const frameSources = useMemo(() => {
    const frameMap = import.meta.glob("@/assets/Photos/*.jpg", {
      eager: true,
      import: "default",
    }) as Record<string, string>;

    return Object.entries(frameMap)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([, src]) => src);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(frameSources.length - 1, 0)]
  );

  const textProgress = useTransform(scrollYProgress, [0, 0.05, 1], [0, 0, 1]);

  const textParallaxY = useTransform(textProgress, [0, 0.5, 1], [-250, -750, -1500]);
  const textParallaxScale = useTransform(textProgress, [0, 0.5, 1], [1, 1.8, 3]);
  const textParallaxOpacity = useTransform(
    textProgress,
    [0, 0.35, 0.5, 1],
    [1, 0.6, 0, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setHasScrolled(value > 0.001);
  });

  useEffect(() => {
    if (frameSources.length === 0) return;

    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (const src of frameSources) {
      const img = new Image();
      img.src = src;

      const onComplete = () => {
        loaded++;
        if (loaded === frameSources.length) {
          setImages(imgs);
          setIsLoaded(true);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete;

      imgs.push(img);
    }
  }, [frameSources]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container || !hasScrolled || !isLoaded) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const index = Math.floor(frameIndex.get());
      const img = images[index];

      if (!img) return;

      const scale = Math.max(width / img.width, height / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = frameIndex.on("change", () => {
      requestAnimationFrame(render);
    });

    window.addEventListener("resize", render);
    if (hasScrolled && isLoaded) render();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", render);
    };
  }, [frameIndex, hasScrolled, isLoaded, images]);

  return (
    <section ref={sectionRef} className="relative h-[500vh] w-full bg-black">
      <div
        ref={containerRef}
        className="sticky top-0 h-[120vh] w-full flex items-center justify-center overflow-hidden perspective-[1200px]"
      >
        {/* Hero image */}
        <motion.img
          src={heroBg}
          alt=""
          className="absolute inset-0 z-0 w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Canvas (scroll-driven frame sequence) */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-[1] ${hasScrolled && isLoaded ? "opacity-100" : "opacity-0"
            }`}
        />

        <div className="hero-grain absolute inset-0 z-[3]" />

        {/* Heading */}
        <motion.div
          style={{
            y: textParallaxY,
            scale: textParallaxScale,
            opacity: textParallaxOpacity,
          }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#303030] font-regular tracking-[-0.02em] leading-tight">
            Step <span style={{ fontFamily: "Pacifico" }}>into</span> better
            <br />
            digital experiences
          </h1>

          <p className="mt-4 max-w-[400px] text-base md:text-lg text-[#424141] leading-[1.4] md:leading-[1.2]">
            An AI companion that whispers clarity, conjures ideas, and guides your every move.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
