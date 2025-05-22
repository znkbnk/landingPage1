
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    console.log('Navbar mounted:', navbarRef.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!mobileMenuRef.current) {
      console.error('Mobile menu ref is null');
      return;
    }
    
    gsap.to(mobileMenuRef.current, {
      y: isMenuOpen ? 0 : '-100%',
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
      }
    });
  }, [isMenuOpen]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const logoElement = logoRef.current;
      if (logoElement) {
        logoElement.addEventListener('mouseenter', () => {
          gsap.to(logoElement, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
        
        logoElement.addEventListener('mouseleave', () => {
          gsap.to(logoElement, {
            scale: 1,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
      }
      
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        const underline = item.querySelector('.menu-underline');
        item.addEventListener('mouseenter', () => {
          gsap.to(underline, {
            width: '100%',
            duration: 0.3,
            ease: 'power1.out'
          });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(underline, {
            width: '0%',
            duration: 0.3,
            ease: 'power1.out'
          });
        });
      });
    }, navbarRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <>
      <nav ref={navbarRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <div ref={logoRef} className="navbar-logo">
            <a href="#" className="logo">
              <span className="logo-text">GSAP</span>
              <span className="logo-dot">.</span>
              <span className="logo-text">Land</span>
            </a>
          </div>
          
          <div className="navbar-menu">
            <ul className="menu-list">
              <li className="menu-item">
                <a href="#" className="active">
                  Home
                  <span className="menu-underline"></span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#services">
                  Services
                  <span className="menu-underline"></span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#features">
                  Features
                  <span className="menu-underline"></span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#portfolio">
                  Portfolio
                  <span className="menu-underline"></span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#contact">
                  Contact
                  <span className="menu-underline"></span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="navbar-cta">
            <button className="btn btn-primary">
              <span>Get Started</span>
            </button>
          </div>
          
          <div className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`toggle-bar ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </nav>
      
      <div ref={mobileMenuRef} className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <a href="#" className="active">Home</a>
            </li>
            <li className="mobile-menu-item">
              <a href="#services">Services</a>
            </li>
            <li className="mobile-menu-item">
              <a href="#features">Features</a>
            </li>
            <li className="mobile-menu-item">
              <a href="#portfolio">Portfolio</a>
            </li>
            <li className="mobile-menu-item">
              <a href="#contact">Contact</a>
            </li>
          </ul>
          
          <div className="mobile-menu-cta">
            <button className="btn btn-primary">
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
