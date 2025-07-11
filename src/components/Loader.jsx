import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const Loader = () => {
  const loaderRef = useRef(null);
  gsap.registerPlugin(SplitText);

  useGSAP(() => {
  
    document.fonts.ready.then(() => {
      const split = new SplitText(".split", { type: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(split.chars, {
        y: 100,
        rotationX: 90,
        opacity: 0,
        color: "#ffffff",
        stagger: 0.03,
        duration: 1,
        transformOrigin: "center top",
        perspective: 700,
      })
        .to(split.chars, {
          duration: 1,
          stagger: 0.04,
          ease: "power2.inOut",
        })
        .to(
          ".loader-top",
          {
            y: "-100%",
            duration: 1.2,
          },
          "+=0.5"
        )
        .to(
          ".loader-bottom",
          {
            y: "100%",
            duration: 1.2,
          },
          "<"
        )
        .set(loaderRef.current, { display: "none" });
    });
  }, []);

  return (
    <section
      ref={loaderRef}
      className="w-full h-screen fixed top-0 left-0 z-[9999] overflow-hidden"
    >
      <div className="loader-top w-full h-1/2 flex items-end justify-center bg-[#1F1E24]">
        <h2 className="split text-white text-6xl sm:text-8xl font-[acma-black]">
          <span className="above block">Forged In</span>
        </h2>
      </div>

      <div className="loader-bottom w-full h-1/2 flex items-start justify-center bg-[#1F1E24]">
        <h2 className="split text-white text-6xl sm:text-8xl font-[acma-black]">
          <span className="below block">Syntax</span>
        </h2>
      </div>
    </section>
  );
};

export default Loader;
