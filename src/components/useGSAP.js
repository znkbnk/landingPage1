// useGSAP.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGSAP = (animationFunc, dependencies = []) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFunc();
    });
    return () => ctx.revert();
  }, dependencies);
};

export const fadeInUp = (elements, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    ...options
  };
  return gsap.from(elements, defaults);
};

export const fadeInLeft = (elements, options = {}) => {
  const defaults = {
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    ...options
  };
  return gsap.from(elements, defaults);
};

export const fadeInRight = (elements, options = {}) => {
  const defaults = {
    x: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    ...options
  };
  return gsap.from(elements, defaults);
};

export const scaleIn = (elements, options = {}) => {
  const defaults = {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)",
    ...options
  };
  return gsap.from(elements, defaults);
};

export const slideInBottom = (elements, options = {}) => {
  const defaults = {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    ...options
  };
  return gsap.from(elements, defaults);
};

export const createScrollTrigger = (trigger, animation, options = {}) => {
  const defaults = {
    trigger,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    ...options
  };
  return ScrollTrigger.create({
    ...defaults,
    animation
  });
};

export default useGSAP;