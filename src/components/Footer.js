import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from './SvgAssets';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);
  const copyrightRef = useRef(null);
  const topButtonRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(waveRef.current.querySelectorAll('path'),
        { x: 0 },
        {
          x: '-50%',
          repeat: -1,
          duration: 25,
          ease: 'linear'
        }
      );

      gsap.from(logoRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });

      const linkElements = linksRef.current.querySelectorAll('a, li');
      gsap.set(linkElements, { opacity: 0, y: 30 }); 
      
      gsap.to(linkElements, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      const columnHeaders = linksRef.current.querySelectorAll('h3');
      gsap.set(columnHeaders, { opacity: 0, y: 20 });
      
      gsap.to(columnHeaders, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      const socialIcons = socialsRef.current.querySelectorAll('.social-icon');
      gsap.from(socialIcons, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.4,
        ease: 'back.out(1.2)'
      });

      gsap.from(copyrightRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
      });

      gsap.set(topButtonRef.current, { scale: 0, opacity: 0 });

      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1 && self.progress > 0.2) {
            gsap.to(topButtonRef.current, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(1.2)'
            });
          } else if (self.direction === -1 && self.progress < 0.2) {
            gsap.to(topButtonRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'back.in(1.2)'
            });
          }
        }
      });

      topButtonRef.current.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: 0,
          duration: 1.2,
          ease: 'power3.inOut'
        });
      });

      setTimeout(() => {
        const links = linksRef.current.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, {
              x: 5,
              color: '#5d45ff',
              duration: 0.2
            });
          });
          link.addEventListener('mouseleave', () => {
            gsap.to(link, {
              x: 0,
              color: 'rgba(255, 255, 255, 0.8)',
              duration: 0.3
            });
          });
        });
      }, 100);

      socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            y: -5,
            backgroundColor: '#5d45ff',
            duration: 0.2
          });
        });
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            y: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            duration: 0.3
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      {/* Animated wave background */}
      <div ref={waveRef} className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#5d45ff" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#5d45ff" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#5d45ff" />
        </svg>
      </div>

      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-about">
              <div ref={logoRef} className="footer-logo">
                <a href="/" className="logo">
                  <span className="logo-text">GSAP</span>
                  <span className="logo-dot">.</span>
                  <span className="logo-text">Land</span>
                </a>
              </div>
              <p className="footer-description">
                We create stunning web experiences with GSAP animations that captivate your audience and elevate your brand.
              </p>
              <div ref={socialsRef} className="footer-social">
                <a href="#" className="social-icon" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Dribbble">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.07 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-8.02-7.77c-1.44 3.738-2.04 6.87-2.19 7.77-1.23.52-2.58.814-4 .814-2.37 0-4.56-.808-6.29-2.165.21-.375 2.28-4.385 8.07-6.4l-.066-.02zm-2.32-2.15c-2.57-.833-4.3-1.61-4.92-1.91-.6-.3-1.17-.14-1.51.19-.15.15-.26.36-.22.59.21 1.36 1.15 6.73 4.74 10.13.03.03.06.04.09.04.17 0 .34-.1.43-.25.28-.47 3.13-5.48 1.38-8.79zm7.29.94c-1.67-.48-3.23-.76-4.38-.87l-.03-.01c-.31-.06-.62 0-.88.19-.72.52-4.32 3.19-4.71 10.07 0 .01-.01.02-.01.03-.01.2.1.38.29.45 1.14.45 3.67 1.06 6.43.79.12-.02.23-.08.31-.17.96-1.1 2.68-4.38 2.99-9.38v-.02c0-.14-.06-.27-.17-.36-.24-.19-.54-.23-.8-.12zm-1.25 1.76c-.28 4.17-1.68 7.04-2.47 8.06 2.47.2 4.85-.3 6.44-1.3-.3-2.99-1.77-5.19-3.97-6.76zm8.17-3.47c-1.3-.78-3.7-1.94-7.06-2.21.04-.2.07-.41.07-.63 0-.23-.03-.45-.1-.67-.02-.05-.03-.1-.05-.15-.3-.8-1.04-1.36-1.89-1.36-1.18 0-2.14.96-2.14 2.14 0 .47.15.9.41 1.25-3.14.5-5.82 1.8-7.02 2.63-.47.34-.61 1-.27 1.47.34.47 1 .61 1.47.27.66-.48 3.06-1.83 6.8-2.58.44 1.45 1.78 2.5 3.32 2.5 1.93 0 3.5-1.57 3.5-3.5 0-.46-.09-.9-.25-1.3.68-.07 1.35-.1 2.02-.1.83 0 1.65.05 2.44.15.34.04.68-.15.82-.48.14-.34-.15-.68-.48-.82z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div ref={linksRef} className="footer-links">
              <div className="footer-links-column">
                <h3>Company</h3>
                <ul>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Team</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3>Resources</h3>
                <ul>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Case Studies</a></li>
                  <li><a href="#">Tutorials</a></li>
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Support</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3>Legal</h3>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Cookie Policy</a></li>
                  <li><a href="#">GDPR</a></li>
                  <li><a href="#">Sitemap</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div ref={copyrightRef} className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} GSAP.Land. All rights reserved.
            </p>
            <p className="credits">
              Made with <span className="heart">❤</span> and GSAP by <a href='https://www.projectschool.dev'>projectschool</a>
            </p>
          </div>
        </div>
      </div>

      <button ref={topButtonRef} className="scroll-to-top" aria-label="Back to top">
        <ArrowRight className="scroll-icon" />
      </button>
    </footer>
  );
};

export default Footer;