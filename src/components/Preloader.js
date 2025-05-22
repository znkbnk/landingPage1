import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

const Preloader = () => {
  const loaderRef = useRef(null);
  const circlesRef = useRef([]);
  const textRef = useRef(null);
  
  useEffect(() => {
    const circles = circlesRef.current;
    const text = textRef.current;
    
    const tl = gsap.timeline();
    
    tl.fromTo(circles, {
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)"
    });
    
    tl.fromTo(text, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5");
    
    circles.forEach((circle, index) => {
      const angle = (index * 137.5) % 360;
      const radius = 50;
      
      gsap.to(circle, {
        x: Math.cos(angle * Math.PI / 180) * radius,
        y: Math.sin(angle * Math.PI / 180) * radius,
        duration: 1,
        ease: "power1.inOut",
        delay: 0.5 + index * 0.1
      });
      
      gsap.to(circle, {
        rotation: 360,
        repeat: -1,
        duration: 4 - index * 0.5,
        ease: "none"
      });
    });
    
    gsap.to(text, {
      text: {
        value: "Welcome to our creative studio",
        delimiter: ""
      },
      duration: 2,
      ease: "none",
      delay: 1
    });
    
    gsap.to(text, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "sine.inOut",
      delay: 3
    });
    
  }, []);
  
  const addToCirclesRef = (el) => {
    if (el && !circlesRef.current.includes(el)) {
      circlesRef.current.push(el);
    }
  };
  
  return (
    <div ref={loaderRef} className="preloader-container">
      <div className="preloader-content">
        <div className="preloader-circles">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              ref={addToCirclesRef}
              className={`preloader-circle circle-${i+1}`}
            ></div>
          ))}
        </div>
        <div ref={textRef} className="preloader-text"></div>
      </div>
    </div>
  );
};

export default Preloader;