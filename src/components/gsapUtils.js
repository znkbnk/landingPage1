// gsapUtils.js
import { gsap } from 'gsap';

export const createParticles = (container, count = 20) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    const hue = Math.random() * 60 + 180; 
    particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.6)`;
    
    container.appendChild(particle);
    
    gsap.to(particle, {
      x: `random(-100, 100)`,
      y: `random(-100, 100)`,
      rotation: `random(-180, 180)`,
      opacity: `random(0.1, 0.8)`,
      duration: `random(10, 20)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.05
    });
  }
};

export const textReveal = (element, text, options = {}) => {
  const defaults = {
    duration: 2,
    ease: "power2.inOut",
    ...options
  };
  
  return gsap.to(element, {
    duration: defaults.duration,
    text: { value: text, delimiter: "" },
    ease: defaults.ease
  });
};

export const createMagneticEffect = (element, strength = 30) => {
  if (!element) return;
  
  const bounds = element.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  
  const handleMouseMove = (e) => {
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    
    gsap.to(element, {
      x: distX * strength / 100,
      y: distY * strength / 100,
      duration: 0.6,
      ease: "power3.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export const createMarquee = (element, speed = 20) => {
  if (!element) return;
  
  const content = element.innerHTML;
  element.innerHTML = content + content;
  
  const width = element.querySelector('*').offsetWidth;
  
  const tween = gsap.to(element.children, {
    x: -width,
    ease: "none",
    repeat: -1,
    duration: width / speed,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % width)
    }
  });
  
  return tween;
};

export const createParallax = (elements, strength = 0.1) => {
  if (!elements || elements.length === 0) return;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    elements.forEach(el => {
      const speed = el.dataset.speed || strength;
      const yPos = -(scrollY * speed);
      
      gsap.to(el, {
        y: yPos,
        ease: "none",
        duration: 0.5
      });
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

export const textScramble = (element, newText, duration = 2) => {
  const originalText = element.innerText;
  const length = Math.max(originalText.length, newText.length);
  const chars = "!<>-_\\/[]{}—=+*^?#";
  
  let timeline = gsap.timeline();
  
  timeline.to(element, {
    duration: duration / 2,
    onUpdate: function() {
      const progress = this.progress();
      let text = "";
      
      for (let i = 0; i < length; i++) {
        if (i < originalText.length * (1 - progress)) {
          text += originalText[i];
        } else {
          text += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.innerText = text;
    }
  });
  
  timeline.to(element, {
    duration: duration / 2,
    onUpdate: function() {
      const progress = this.progress();
      let text = "";
      
      for (let i = 0; i < length; i++) {
        if (i < newText.length * progress) {
          text += newText[i];
        } else {
          text += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.innerText = text;
    }
  });
  
  return timeline;
};

export default {
  createParticles,
  textReveal,
  createMagneticEffect,
  createMarquee,
  createParallax,
  textScramble
};