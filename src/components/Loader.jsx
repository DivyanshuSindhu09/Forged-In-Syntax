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
          ".loader-content",
          {
            height: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "+=0.5"
        )
        .set(loaderRef.current, { display: "none" });
    });
  }, []);

  return (
    <section
      ref={loaderRef}
      className="w-full h-screen fixed top-0 left-0 z-[9999] overflow-hidden pointer-events-none"
    >
      <div className="loader-content h-full bg-[#1F1E24] flex items-center justify-center">
        <h2 className="split text-white text-3xl sm:text-8xl md:text-8xl font-[acma-black] whitespace-nowrap">
          ForgedInSyntax
        </h2>
      </div>
    </section>
  );
};

export default Loader;
