import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Background from "../blocks/Backgrounds/Background/Background";

const About = () => {
  const [xOffset, setXoffset] = useState(0);

  useGSAP(() => {
    gsap.set(".fading", {
      opacity: 0,
      marginTop: "-150vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fading",
        start: "top top",
        end: "+=200% top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".hero-section", {
      delay: 0.5,
      opacity: 0,
      ease: "power1.inOut",
    }).to(".fading", {
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
    });

    const tlTwo = gsap.timeline();
    tlTwo
      // .to(".overlay", {
      //   opacity: 0,
      //   duration: 5,
      //   delay: 2,
      //   ease: "power1.inOut",
      // })
      // .to(".overlay", {
      //   opacity: 1,
      //   duration: 1,
      //   delay: 5,
      //   ease: "power1.inOut",
      // })
      // .to(".overlay", {
      //   opacity: 0,
      //   duration: 5,
      //   delay: 2,
      //   ease: "power1.inOut",
      // });
  }, []);

  const hoizontalHandler = () => {
    const xAxis = ((Math.random() * 4) - 2).toFixed(1);
    setXoffset(xAxis);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      hoizontalHandler();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen relative fading">
    
      <div id="light" className="absolute inset-0 z-10 bg-transparent">
        <Background xOffset={xOffset} />
      </div>

    
      <div className="absolute z-20 inset-0 flex flex-col items-center justify-center px-6 text-white text-center">
        <h2 className="font-bold font-[acma-black] text-4xl sm:text-6xl md:text-7xl leading-tight">
          Forge Your Future.
          <br />
          Join Now
        </h2>
        <p className="font-[absans] mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl">
          Building innovative tech solutions through collaboration in web, mobile, 
          cybersecurity, and more.
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => {
          const nextSection = document.getElementById('features-section');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-30 flex flex-col items-center group focus:outline-none"
        aria-label="Scroll Down"
        style={{background: 'none', border: 'none'}}
      >
        <span className="animate-bounce">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 8px #0008)' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
        <span className="mt-1 text-xs text-white opacity-80 tracking-widest group-hover:opacity-100 transition">Scroll Down</span>
      </button>
    </section>
  );
};

export default About;
