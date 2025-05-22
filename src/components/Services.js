// Services.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

useEffect(() => {
  let ctx = gsap.context(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
tl.from(cardsRef.current.querySelectorAll('.service-card'), {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
}, "-=1");

    const cards = cardsRef.current.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      const icon = card.querySelector('.service-icon');
      const overlay = card.querySelector('.card-overlay');
      const arrow = card.querySelector('.service-arrow');

      const hoverTl = gsap.timeline({ paused: true });

      // Determine if the card is in the top or bottom row
      const isTopRow = index < 3; // First 3 cards (0,1,2) are top row
      const yMovement = isTopRow ? -15 : 15; // Top cards go up, bottom cards go down

      hoverTl
        .to(card, {
          y: yMovement,
          scale: 1.03,
          boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
          duration: 0.4,
          ease: "power2.out"
        })
        .to(icon, {
          rotate: 360,
          duration: 0.8,
          ease: "power1.inOut"
        }, "-=0.4")
        .to(overlay, {
          opacity: 1,
          duration: 0.4
        }, "-=0.8")
        .to(arrow, {
          x: 10,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.4");

      card.addEventListener('mouseenter', () => hoverTl.play());
      card.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    // Floating shapes animation
    const shapes = sectionRef.current.querySelectorAll('.service-shape');
    shapes.forEach(shape => {
      gsap.to(shape, {
        y: "random(-60, 60)",
        x: "random(-40, 40)",
        rotation: "random(-30, 30)",
        duration: "random(15, 30)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

  }, sectionRef);

  return () => {
    // Clean up hover animations
    const cards = cardsRef.current?.querySelectorAll('.service-card') || [];
    cards.forEach(card => {
      card._hoverAnim && card._hoverAnim.kill();
    });
    ctx.revert();
  };
}, []);

  const serviceData = [
    {
      id: 1,
      icon: "🚀",
      title: "Interactive Animations",
      description: "Create stunning animations that engage users and bring your website to life with GSAP's powerful animation capabilities."
    },
    {
      id: 2,
      icon: "⚙️",
      title: "Advanced Transitions",
      description: "Implement smooth page transitions and element movements that enhance user experience and visual appeal."
    },
    {
      id: 3,
      icon: "📱",
      title: "Responsive Interactions",
      description: "Design interactions that work seamlessly across all devices and screen sizes with optimized performance."
    },
    {
      id: 4,
      icon: "🎨",
      title: "Creative Effects",
      description: "Add unique visual effects that make your brand stand out and create memorable experiences for your users."
    },
    {
      id: 5,
      icon: "⏱️",
      title: "Timeline Control",
      description: "Precisely control animation sequences and timing to create complex, choreographed motion experiences."
    },
    {
      id: 6,
      icon: "🔄",
      title: "Scroll-Based Animations",
      description: "Trigger animations as users scroll through your content, creating engaging storytelling opportunities."
    }
  ];

  return (
    <section ref={sectionRef} className="services" id='services' data-bgcolor="#0c1023">
      <div className="container">
        <div ref={titleRef} className="section-title">
          <h2 className="title-animation">Our Services</h2>
          <p className="title-animation">We provide exceptional digital experiences with GSAP animations that captivate and engage your audience</p>
        </div>
        <div ref={cardsRef} className="services-grid">
          {serviceData.map(service => (
            <div className="service-card" key={service.id}>
              <div className="card-overlay"></div>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
      <div className="service-shapes">
        <div className="service-shape shape-1"></div>
        <div className="service-shape shape-2"></div>
        <div className="service-shape shape-3"></div>
      </div>
    </section>
  );
};

export default Services;