import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Second from "./Second"
import { useEffect, useState, useRef } from "react";


const Hero = () => {
  const bigImage = '/forged_landscape.jpeg'
  const smallImage = '/forged_portrait.jpeg'
  const [photoSrc, setPhotoSrc] = useState(
  window.innerWidth < 760 ? smallImage : bigImage
);
  const handleImageSrc = () => {
  if (window.innerWidth < 760) {
    setPhotoSrc(smallImage); 
  } else {
    setPhotoSrc(bigImage); 
  }
};

  useEffect(()=>{
    window.addEventListener('resize', handleImageSrc)
    console.log(photoSrc)
    return ()=>{
      window.removeEventListener('resize', handleImageSrc)
    }
  },[])

  const [blur, setBlur] = useState(0); 
  const [showOverlayText, setShowOverlayText] = useState(true);
  const [maskDone, setMaskDone] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    
    if (!maskDone) return;
    let intervalId;
    const handleScrollOrOverlay = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
   
      const overlayLogo = document.querySelector('.overlay-logo');
      let overlayLogoVisible = false;
      if (overlayLogo) {
        const style = window.getComputedStyle(overlayLogo);
        overlayLogoVisible = style.opacity && parseFloat(style.opacity) > 0.5;
      }
     
      if (overlayLogoVisible) {
        setShowOverlayText(false);
        return;
      }
      // If hero section is mostly in view, show text, else hide
      if (rect.top > -windowHeight * 0.3 && rect.bottom > windowHeight * 0.3) {
        setShowOverlayText(true);
      } else {
        setShowOverlayText(false);
      }
    };
    window.addEventListener('scroll', handleScrollOrOverlay);
    intervalId = setInterval(handleScrollOrOverlay, 200);
    return () => {
      window.removeEventListener('scroll', handleScrollOrOverlay);
      clearInterval(intervalId);
    };
  }, [maskDone]);

  useGSAP(() => {
    gsap.set('.mask-wrapper', {
      maskPosition: "42% 41%",
      maskSize: "11000% 11000%",
    });

    // gsap.set('.mask-logo', { marginTop: '-100vh', opacity: 0 });

    gsap.set('.entrance-message', { marginTop: '0vh' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        scrub: 2,
        end: '+=250%',
        pin: true,
      }
    })

   
      // .to('.fade-out', { opacity: 0, ease: 'power1.inOut' })
      // .to('.scale-out', { scale: 1, ease: 'power1.inOut' })
      .to('.mask-wrapper', { 
        duration : 5,
        maskPosition : "50% 90%",
        maskSize : "40% 40%", ease: 'power1.inOut' }, '<')
      .to('.mask-wrapper', { opacity: 0, onComplete: () => setMaskDone(true) })
      // .to('.overlay-logo', { opacity: 1, duration :0.1, onComplete: () => {
      //   gsap.to('.overlay-logo', { opacity: 0, duration:0.1 });
      // } }, '<')
      .to('.entrance-message', { duration: 1, ease: 'power1.inOut', maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)' }, '<')
    
    // No blur animation needed
  });

  return (
    <section className="hero-section" ref={heroRef}>
      
      <div 
      // style={{
      //   backgroundImage : `url(${photoSrc})`
      // }}
      className = {`w-full h-screen  mask-wrapper   `}
      >
      <img
      className="w-full h-full object-center object-contain"
      style={{ filter: `none` }}
      src={photoSrc}  />
      {/* Fixed black scroll down indicator */}
      <button
        onClick={() => {
          const nextSection = document.querySelector('.entrance-message');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50 flex flex-col items-center group focus:outline-none"
        aria-label="Scroll Down"
        style={{background: 'none', border: 'none'}}
      >
        <span className="animate-bounce">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down text-black drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 8px #0008)' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
        <span className="mt-1 text-xs text-black opacity-80 tracking-widest group-hover:opacity-100 transition">Scroll Down</span>
      </button>
      </div>

      <Second />
    </section>
  )
}

export default Hero