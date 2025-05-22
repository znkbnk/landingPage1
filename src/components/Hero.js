// Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';
import useGSAP, { fadeInUp } from './useGSAP';
import { createParticles, textReveal } from './gsapUtils';
import { WavyLine } from './SvgAssets';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const shapesRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const particleRef = useRef(null);

  useGSAP(() => {
    if (titleRef.current) {
      fadeInUp('.hero-title', { duration: 1.2, y: 100 });
    }
    if (ctaRef.current) {
      fadeInUp('.btn', { delay: 0.5 });
    }
  }, []);

  useGSAP(() => {
    if (particleRef.current) {
      createParticles(particleRef.current, 30);
    }
    if (titleRef.current) {
      textReveal(titleRef.current, 'Welcome to Our Site', { duration: 3 });
    }
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleRef.current) {
        const titleElements = titleRef.current.querySelectorAll('.title-word');
        tl.from(titleElements, {
          y: 100,
          opacity: 0,
          stagger: 0.15,
          duration: 1
        });
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8
        }, "-=0.4");
      }

      if (ctaRef.current) {
        tl.from(ctaRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 0.7
        }, "-=0.6");
      }

      if (shapesRef.current) {
        const shapes = shapesRef.current.querySelectorAll('.shape');
        tl.from(shapes, {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        }, "-=1");

        shapes.forEach((shape, i) => {
          const randomX = Math.random() * 20 - 10;
          const randomY = Math.random() * 20 - 10;
          const randomRotation = Math.random() * 20 - 10;
          const randomDuration = 3 + Math.random() * 4;

          gsap.to(shape, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          });
        });
      }

      if (scrollIndicatorRef.current) {
        tl.from(scrollIndicatorRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8
        }, "-=0.2");

        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      const handleMouseMove = (e) => {
        if (!shapesRef.current || !titleRef.current || !subtitleRef.current) return;
        const xValue = e.clientX / window.innerWidth;
        const yValue = e.clientY / window.innerHeight;

        const shapes = shapesRef.current.querySelectorAll('.shape');
        shapes.forEach((shape, i) => {
          const depth = 0.05 + (i * 0.01);
          const moveX = (xValue - 0.5) * depth * 100;
          const moveY = (yValue - 0.5) * depth * 100;

          gsap.to(shape, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power1.out"
          });
        });

        gsap.to(titleRef.current, {
          x: (xValue - 0.5) * 15,
          y: (yValue - 0.5) * 10,
          duration: 1,
          ease: "power1.out"
        });

        gsap.to(subtitleRef.current, {
          x: (xValue - 0.5) * 10,
          y: (yValue - 0.5) * 7,
          duration: 1,
          ease: "power1.out"
        });
      };

      if (heroRef.current) {
        heroRef.current.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        if (heroRef.current) {
          heroRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" data-bgcolor="#0a0a20">
      <WavyLine className="hero-wave" />
      <div className="container">
        <div className="hero-content">
          <div ref={particleRef} className="particle-container"></div>
          <h1 ref={titleRef} className="hero-title">
            <span className="title-word">Creative</span>
            <span className="title-word">Digital</span>
            <span className="title-word">Experience</span>
          </h1>
          <p ref={subtitleRef} className="hero-subtitle">
            Crafting stunning digital experiences with cutting-edge animations and interactions
          </p>
          <div ref={ctaRef} className="hero-cta">
            <button className="btn btn-primary">
              <span>Get Started</span>
            </button>
            <button className="btn btn-outline">
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
      <div ref={shapesRef} className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
      </div>
      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;