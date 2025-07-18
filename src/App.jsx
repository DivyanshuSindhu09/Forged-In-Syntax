import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Toaster } from "react-hot-toast";
import First from './sections/First';
import Projects from './sections/Projects';
import About from './components/About';
import Loader from './components/Loader';
import Features from './components/Features';
import Members from './components/Members';

import Lenis from '@studio-freight/lenis';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.03,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return value !== undefined
          ? lenis.scrollTo(value)
          : lenis.scroll.instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', () => lenis.update());
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Toaster position="top-right" />
      {/* <Loader /> */}
      <First />
      {/* <About /> */}
      <Features />
      {/* <Members /> */}
      {/* <Projects /> */}
      {/* <Footer/> */}
    </main>
  );
};

export default App;