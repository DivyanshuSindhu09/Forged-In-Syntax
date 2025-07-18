import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Second from "./Second";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const bigImage = "/forged_landscape.jpeg";
  const smallImage = "/forged_portrait.jpeg";

  const [photoSrc, setPhotoSrc] = useState(
    window.innerWidth < 760 ? smallImage : bigImage
  );

  const handleImageSrc = useCallback(() => {
    setPhotoSrc(window.innerWidth < 760 ? smallImage : bigImage);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleImageSrc);
    return () => window.removeEventListener("resize", handleImageSrc);
  }, [handleImageSrc]);

  const [showOverlayText, setShowOverlayText] = useState(true);
  const [maskDone, setMaskDone] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!maskDone) return;

    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const overlayLogo = document.querySelector(".overlay-logo");
      const overlayVisible =
        overlayLogo &&
        parseFloat(window.getComputedStyle(overlayLogo).opacity || "0") > 0.5;

      setShowOverlayText(
        !overlayVisible &&
          rect.top > -windowHeight * 0.3 &&
          rect.bottom > windowHeight * 0.3
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maskDone]);

  // GSAP animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(".mask-wrapper", {
        maskPosition: "42% 41%",
        maskSize: "11000% 11000%",
      });

      gsap.set(".entrance-message", { marginTop: "0vh" });

     const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "+=200%", 
    scrub: 3,      
    pin: true,
  },
});

      tl.to(".mask-wrapper", {
        duration: 2,
        maskPosition: "50% 90%",
        maskSize: "40% 40%",
        ease: "power1.inOut",
      })
        .to(".mask-wrapper", {
          opacity: 0,
          onComplete: () => setMaskDone(true),
        })
        .to(".entrance-message", {
          duration: 6,
          ease: "power1.inOut",
          maskImage:
            "radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)",
        });

      gsap.to(".orb", {
        duration: 1,
        ease: "power1.inOut",
        y: 0,
        delay : 5
      });
    });

    return () => ctx.revert();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 900,
        },
      },
      color: {
        value: ["#b14fff", "#5084ff"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.3,
        random: true,
      },
      size: {
        value: 6,
        random: true,
      },
      move: {
        enable: true,
        speed: 0.8,
        outMode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 80 },
        push: { quantity: 2 },
      },
    },
  }), []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="w-full h-screen mask-wrapper relative overflow-hidden">
  <Particles
    id="tsparticles"
    init={particlesInit}
    options={particlesOptions}
    className="absolute top-0 left-0 w-full h-full z-0"
  />

  <div className="w-full h-full absolute flex flex-col justify-center items-center z-10 px-4 text-center">
    <div className="overflow-hidden">
      <h1 className="orb text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl font-[acma-black] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 leading-tight">
        A PROFESSIONAL
      </h1>
    </div>
   
    <div className="overflow-hidden">
      <h1 className="orb text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl font-[acma-black] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 leading-tight">
        CODING COMMUNITY
      </h1>
    </div>
  </div>

  <button
    onClick={() => {
      const next = document.querySelector(".entrance-message");
      if (next) next.scrollIntoView({ behavior: "smooth" });
    }}
    className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50 flex flex-col items-center group focus:outline-none"
    aria-label="Scroll Down"
    style={{ background: "none", border: "none" }}
  >
    <span className="animate-bounce">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-down text-white"
        style={{ filter: "drop-shadow(0 2px 8px #0008)" }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
    <span className="mt-1 text-xs text-white opacity-80 tracking-widest group-hover:opacity-100 transition">
      Scroll Down
    </span>
  </button>
</div>


      <Second />
    </section>
  );
};

export default Hero;
