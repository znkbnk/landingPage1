import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Team.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const teamRef = useRef(null);
  const titleRef = useRef(null);
  const membersRef = useRef(null);

  // Team member data
  const teamData = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Lead Animator",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "Expert in creating stunning animations with 8+ years of GSAP experience",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Jordan Lee",
      role: "Creative Director",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "Award-winning designer with a passion for interactive storytelling",
      social: {
        twitter: "#",
        linkedin: "#",
        dribbble: "#"
      }
    },
    {
      id: 3,
      name: "Taylor Kim",
      role: "Frontend Developer",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "Code wizard specializing in high-performance animations and interactions",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 4,
      name: "Casey Rivera",
      role: "UX Designer",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bio: "Human-centered designer focused on creating memorable digital experiences",
      social: {
        twitter: "#",
        linkedin: "#",
        dribbble: "#"
      }
    }
  ];
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Ensure elements are initially hidden
      gsap.set(titleRef.current.querySelectorAll('.title-animation'), { opacity: 0, y: 20 });
      gsap.set(membersRef.current.querySelectorAll('.team-member'), { opacity: 0, y: 50 });

      // Section title animation
      gsap.to(titleRef.current.querySelectorAll('.title-animation'), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Team members staggered animation
      const members = membersRef.current.querySelectorAll('.team-member');
      gsap.to(members, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: membersRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Set up hover animations for team members
      members.forEach(member => {
        const overlay = member.querySelector('.member-overlay');
        const content = member.querySelector('.member-content');
        const socialIcons = member.querySelectorAll('.social-icon');
        const image = member.querySelector('.member-image');
        
        // Set initial states for hover elements
        gsap.set(overlay, { opacity: 0 });
        gsap.set(content, { opacity: 0 });
        gsap.set(socialIcons, { opacity: 0, y: 20 });
        
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(overlay, {
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(image, {
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3")
        .to(content, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.2")
        .to(socialIcons, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, "-=0.2");
        
        member.addEventListener('mouseenter', () => hoverTl.play());
        member.addEventListener('mouseleave', () => hoverTl.reverse());
      });
      
      // Add floating animation to team members
      members.forEach((member, i) => {
        gsap.to(member, {
          y: i % 2 === 0 ? 15 : -15,
          duration: 2 + (i * 0.2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      });
      
    }, teamRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={teamRef} className="team" id="team" data-bgcolor="#0c1023">
      <div className="container">
        <div ref={titleRef} className="section-title">
          <h2 className="title-animation">Meet Our Team</h2>
          <p className="title-animation">
            Our talented group of designers and developers who create magical web experiences
          </p>
        </div>
        
        <div ref={membersRef} className="team-grid">
          {teamData.map(member => (
            <div className="team-member" key={member.id}>
              <div className="member-image-container">
                <img src={member.image} alt={member.name} className="member-image" />
                <div className="member-overlay"></div>
                <div className="member-content">
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    {Object.entries(member.social).map(([platform, url], index) => (
                      <a 
                        key={index} 
                        href={url} 
                        className={`social-icon ${platform}`}
                        aria-label={platform}
                      >
                        {platform.charAt(0).toUpperCase()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="team-decorations">
        <div className="team-decoration decoration-1"></div>
        <div className="team-decoration decoration-2"></div>
        <div className="team-decoration decoration-3"></div>
      </div>
    </section>
  );
};

export default Team;