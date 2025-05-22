import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "./SvgAssets";
import "./Testimonials.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const testimonialsRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const slidesRef = useRef(null);
  const dotsRef = useRef(null);
  const marqueeRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideIntervalRef = useRef(null);

  // Testimonial data
  const testimonialData = [
    {
      id: 1,
      name: "Emily Johnson",
      role: "Creative Director, PixelPerfect",
      avatar: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "GSAP has transformed how we approach web animations. The timeline feature allows us to create complex sequences that would be nearly impossible with traditional methods.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer, TechFusion",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "The ScrollTrigger plugin changed everything for us. Our storytelling capabilities improved dramatically, and user engagement metrics have never been better.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "UX Designer, InteractLab",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "We've tried many animation libraries, but GSAP stands out for its reliability and flexibility. It handles complex animations with ease.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Founder, AnimateStudio",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "As a studio focused on interactive experiences, GSAP is our secret weapon. The ability to create seamless animations that work consistently across browsers.",
      rating: 5,
    },
  ];

  const totalSlides = testimonialData.length;

  // Create marquee animation
 

  // Clear and restart auto-slide interval
  const resetAutoSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    
    slideIntervalRef.current = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide();
      }
    }, 5000);
  };

  // Initialize animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current.querySelectorAll(".title-animation"), { 
        opacity: 0, 
        y: 30 
      });
      gsap.set(sliderRef.current, { 
        opacity: 0, 
        y: 50 
      });

      // Title animation
      gsap.to(titleRef.current.querySelectorAll(".title-animation"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // Slider animation
      gsap.to(sliderRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // Marquee animation


      // Set initial slide positions - all slides hidden except first
      const slides = slidesRef.current?.querySelectorAll(".testimonial-slide") || [];
      if (slides.length > 0) {
        slides.forEach((slide, index) => {
          if (index === 0) {
            gsap.set(slide, { 
              opacity: 1, 
              display: "block",
              zIndex: 2
            });
          } else {
            gsap.set(slide, { 
              opacity: 0, 
              display: "none",
              zIndex: 1
            });
          }
        });
      }

      // Start auto-slide
      resetAutoSlide();
    }, testimonialsRef);

    return () => {
      ctx.revert();
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, []);

  // Handle slide change animation
  const animateSlideChange = (newIndex) => {
    if (isAnimating || newIndex === currentSlide) return;
    setIsAnimating(true);

    const slides = slidesRef.current?.querySelectorAll(".testimonial-slide") || [];
    const dots = dotsRef.current?.querySelectorAll(".testimonial-dot") || [];

    if (slides.length === 0 || newIndex >= slides.length) {
      setIsAnimating(false);
      return;
    }

    const currentSlideEl = slides[currentSlide];
    const nextSlideEl = slides[newIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);
        setIsAnimating(false);
        resetAutoSlide(); // Restart auto-slide after manual navigation
      },
    });

    // Prepare next slide (make it visible but transparent)
    gsap.set(nextSlideEl, { 
      display: "block", 
      opacity: 0, 
      scale: 1.05,
      zIndex: 3
    });

    // Animate out current slide
    tl.to(currentSlideEl, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
    });

    // Animate in next slide
    tl.to(nextSlideEl, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

    // Hide previous slide and reset z-index
    tl.call(() => {
      gsap.set(currentSlideEl, { 
        display: "none",
        zIndex: 1
      });
      gsap.set(nextSlideEl, { 
        zIndex: 2
      });
    });

    // Update dots
    if (dots.length > 0) {
      tl.to(dots, { 
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0.3)", 
        duration: 0.3 
      }, "-=0.6");
      
      tl.to(dots[newIndex], { 
        scale: 1.2,
        backgroundColor: "var(--secondary, #ff6b35)", 
        duration: 0.3 
      }, "-=0.3");
    }
  };

  // Navigation functions
  const goToSlide = (index) => animateSlideChange(index);
  const goToNextSlide = () => animateSlideChange((currentSlide + 1) % totalSlides);
  const goToPrevSlide = () => animateSlideChange((currentSlide - 1 + totalSlides) % totalSlides);

  return (
    <section
      ref={testimonialsRef}
      className="testimonials"
      id="testimonials"
      data-bgcolor="#0c1023"
    >
     

      <div className="container">
        <div ref={titleRef} className="section-title">
          <h2 className="title-animation">Client Testimonials</h2>
          <p className="title-animation">
            Hear what our clients have to say about their experience working with us
          </p>
        </div>

        <div ref={sliderRef} className="testimonial-slider">
          <div className="testimonial-track" ref={slidesRef}>
            {testimonialData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${index === currentSlide ? "active" : ""}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  display: index === 0 ? 'block' : 'none'
                }}
              >
                <div className="testimonial-quote">"</div>
                <div className="testimonial-content">
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="author-details">
                    <h4>{testimonial.name}</h4>
                    <div className="author-role">{testimonial.role}</div>
                    <div className="author-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`star ${i < testimonial.rating ? "filled" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            <button 
              className="testimonial-arrow prev" 
              onClick={goToPrevSlide}
              disabled={isAnimating}
              aria-label="Previous testimonial"
            >
              ❮
            </button>
            <div className="testimonial-dots" ref={dotsRef}>
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="testimonial-arrow next" 
              onClick={goToNextSlide}
              disabled={isAnimating}
              aria-label="Next testimonial"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      <div className="testimonial-decorations">
        <div className="decoration decoration-1"></div>
        <div className="decoration decoration-2"></div>
        <div className="decoration decoration-3"></div>
      </div>
    </section>
  );
};

export default Testimonials;