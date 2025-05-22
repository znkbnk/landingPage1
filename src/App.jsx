// App.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin, TextPlugin);

const App = () => {
  const appRef = useRef(null);
  const loaderRef = useRef(null);

  

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
        }
      });
      
      tl.from("main", {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
      
      tl.from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.7");
      
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
        start: "top 80%",
      });
      
      const sections = document.querySelectorAll("section");
      sections.forEach((section, i) => {
        const nextSection = sections[i + 1];
        if (nextSection) {
          ScrollTrigger.create({
            trigger: nextSection,
            start: "top 90%",
            onEnter: () => gsap.to("body", {
              backgroundColor: nextSection.dataset.bgcolor || "#ffffff",
              duration: 1.5
            }),
            onLeaveBack: () => gsap.to("body", {
              backgroundColor: section.dataset.bgcolor || "#ffffff",
              duration: 1.5
            })
          });
        }
      });
      
      gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, {
          backgroundPosition: `50% ${-innerHeight / 2}px`,
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
      
      gsap.utils.toArray('.float-element').forEach((element, i) => {
        gsap.to(element, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-5, 5)",
          duration: "random(3, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2
        });
      });
      
    }, appRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={appRef} className="app">
      <div ref={loaderRef} className="preloader">
        <Preloader />
      </div>
      
      <Cursor />
      <Navbar />
      
      <main>
        <ErrorBoundary>
        <Hero />
        <Services />
        <Features />
        <Portfolio />
        <Testimonials />
        <Team />
        <Contact />
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;