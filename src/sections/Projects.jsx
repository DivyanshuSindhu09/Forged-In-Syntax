import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Projects = () => {
  useGSAP(() => {
    
    document.fonts.ready.then(() => {
      const split = new SplitText(".colla", { type: "chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".colla",
        },
      });

      tl.from(split.chars, {
        y: 100,
        rotationX: 90,
        opacity: 0,
        color: "#ffffff",
        stagger: 0.03,
        duration: 1,
        transformOrigin: "center top",
        perspective: 700,
      }).to(split.chars, {
        duration: 1,
        stagger: 0.04,
        ease: "power2.inOut",
      });
    });
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const [preview, setPreview] = useState(null);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space bg-transparent section-spacing px-4 sm:px-8"
    >
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-[acma-black] text-center sm:text-left colla">
        Collaborative <br /> Projects
      </h2>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-8 sm:mt-12 h-[1px] w-full" />

      <div className="space-y-10 sm:space-y-14 mt-10">
        {myProjects.map((project) => (
          <Project key={project.id} {...project} setPreview={setPreview} />
        ))}
      </div>

      {preview && (
        <motion.img
          className="hidden sm:block fixed top-0 left-0 z-50 object-contain h-56 w-80 rounded-lg shadow-lg pointer-events-none"
          src={preview}
          style={{ x: springX, y: springY }}
          alt="preview"
        />
      )}
    </section>
  );
};

export default Projects;
