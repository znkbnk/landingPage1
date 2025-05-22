import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const infoRef = useRef(null);
  const buttonRef = useRef(null); // Add a specific ref for the button
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Get the label associated with this input
    const label = e.target.previousElementSibling;
    if (value) {
      gsap.to(label, {
        y: -25,
        scale: 0.8,
        color: '#5d45ff',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(label, {
        y: 0,
        scale: 1,
        color: '#333',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success message
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus(null);
        
        // Reset labels when form is reset
        const labels = formRef.current.querySelectorAll('label');
        labels.forEach(label => {
          gsap.to(label, {
            y: 0,
            scale: 1,
            color: '#333',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }, 3000);
    }, 1500);
    
    // Animation for input elements only (not button)
    const formInputElements = formRef.current.querySelectorAll('input, textarea');
    gsap.to(formInputElements, {
      y: -10,
      opacity: 0.7,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(formInputElements, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.out',
          delay: 1
        });
      }
    });
  };
  
  // Force button and contact info visibility
  useEffect(() => {
    // Set button to visible immediately on component mount
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 1, clearProps: "all" });
    }
    
    // Ensure contact info is visible
    if (infoRef.current) {
      const infoItems = infoRef.current.querySelectorAll('.contact-info-item');
      if (infoItems && infoItems.length > 0) {
        gsap.set(infoItems, { opacity: 1, clearProps: "visibility" });
      }
    }
  }, []);
  
  useEffect(() => {
    // Create a GSAP context for better memory management
    const ctx = gsap.context(() => {
      // Reset any potential GSAP opacities on button
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 1, clearProps: "all" });
      }
      
      // Title animations
      const titleElements = titleRef.current?.querySelectorAll('.title-animation');
      if (titleElements && titleElements.length > 0) {
        gsap.from(titleElements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Form animation - excluding the button
      if (formRef.current) {
        const formContent = formRef.current.querySelectorAll('.form-group');
        gsap.from(formContent, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Map animation
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
      
      // Contact info items animation - Modified to ensure visibility
      if (infoRef.current) {
        const infoItems = infoRef.current.querySelectorAll('.contact-info-item');
        if (infoItems && infoItems.length > 0) {
          // First ensure they are visible and have opacity 1 as default
          gsap.set(infoItems, { opacity: 1, clearProps: "visibility" });
          
          // Then animate from a hidden state
          gsap.fromTo(infoItems, 
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: infoRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
              },
              onComplete: () => {
                // Ensure items remain visible after animation
                gsap.set(infoItems, { opacity: 1, clearProps: "visibility" });
              }
            }
          );
        }
      }
      
      // Form input animations
      if (formRef.current) {
        const inputFields = formRef.current.querySelectorAll('input, textarea');
        inputFields.forEach(input => {
          const label = input.previousElementSibling;
          
          input.addEventListener('focus', () => {
            gsap.to(label, {
              y: -25,
              scale: 0.8,
              color: '#5d45ff',
              duration: 0.3,
              ease: 'power2.out'
            });
            
            gsap.to(input, {
              borderColor: '#5d45ff',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
          
          input.addEventListener('blur', () => {
            if (!input.value) {
              gsap.to(label, {
                y: 0,
                scale: 1,
                color: '#333',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
            
            gsap.to(input, {
              borderColor: '#ddd',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }
      
      // Map marker animation
      if (mapRef.current) {
        const mapMarker = mapRef.current.querySelector('.map-marker');
        if (mapMarker) {
          gsap.to(mapMarker, {
            y: -10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
        
        const mapPulse = mapRef.current.querySelector('.map-pulse');
        if (mapPulse) {
          gsap.to(mapPulse, {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power1.out"
          });
        }
      }
      
    }, contactRef); // Scope to contact section
    
    // Cleanup function
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={contactRef} className="contact" id="contact">
      <div className="container">
        <div ref={titleRef} className="section-title">
          <h2 className="title-animation">Get In Touch</h2>
          <p className="title-animation">
            Have a project in mind? Let's create something amazing together
          </p>
        </div>
        
        <div className="contact-container">
          <div ref={formRef} className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              {/* Add inline style to ensure button visibility */}
              <button
                ref={buttonRef}
                type="submit"
                className={`btn btn-primary submit-button ${isSubmitting ? 'submitting' : ''} ${submitStatus ? submitStatus : ''}`}
                disabled={isSubmitting}
                style={{ opacity: 1, visibility: 'visible', display: 'flex' }}
              >
                {isSubmitting ? (
                  <span className="button-spinner"></span>
                ) : submitStatus === 'success' ? (
                  <span>Message Sent ✓</span>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>
          
          <div ref={mapRef} className="contact-map">
            <div className="map-container">
              <div className="map-image"></div>
              <div className="map-marker">
                <div className="map-pulse"></div>
                <div className="marker-icon">📍</div>
              </div>
            </div>
            
            {/* Add inline style to ensure contact info visibility */}
            <div 
              ref={infoRef} 
              className="contact-info" 
              style={{ opacity: 1, visibility: 'visible' }}
            >
              <div className="contact-info-item" style={{ opacity: 1, visibility: 'visible' }}>
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>Address</h4>
                  <p>123 Animation Street, Digital City, 10001</p>
                </div>
              </div>
              
              <div className="contact-info-item" style={{ opacity: 1, visibility: 'visible' }}>
                <div className="info-icon">📧</div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>hello@goodbye.com</p>
                </div>
              </div>
              
              <div className="contact-info-item" style={{ opacity: 1, visibility: 'visible' }}>
                <div className="info-icon">📱</div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>+1 (234) 567-890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-decorations">
        <div className="decoration decoration-1"></div>
        <div className="decoration decoration-2"></div>
      </div>
    </section>
  );
};

export default Contact;