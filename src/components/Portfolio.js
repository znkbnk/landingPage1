import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import "./Portfolio.css";
import useGSAP, { fadeInLeft, createScrollTrigger } from './useGSAP';
import { createMagneticEffect } from './gsapUtils';
import { DotsGrid } from './SvgAssets';

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const buttonRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const projectsRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const projectsData = useMemo(() => [
    {
      id: 1,
      title: "Motion Branding",
      category: "animation",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["GSAP", "SVG Animation", "Branding"],
    },
    {
      id: 2,
      title: "E-commerce Experience",
      category: "interaction",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["ScrollTrigger", "JavaScript", "UX Design"],
    },
    {
      id: 3,
      title: "3D Product Showcase",
      category: "3d",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["Three.js", "GSAP", "3D Animation"],
    },
    {
      id: 4,
      title: "Interactive Infographic",
      category: "interaction",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["Data Visualization", "SVG", "Animation"],
    },
    {
      id: 5,
      title: "Mobile App Animations",
      category: "animation",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["React Native", "GSAP", "Motion Design"],
    },
    {
      id: 6,
      title: "Immersive Storytelling",
      category: "3d",
      image: "https://images.pexels.com/photos/32156034/pexels-photo-32156034/free-photo-of-smiling-woman-in-natural-sunlight-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tags: ["ScrollTrigger", "WebGL", "Narrative"],
    },
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projectsData;
    }
    return projectsData.filter((project) => project.category === activeFilter);
  }, [activeFilter, projectsData]);

  useGSAP(() => {
    if (projectsRef.current) {
      const items = gsap.utils.toArray('.project-item', projectsRef.current);
      items.forEach((item) => {
        const animation = fadeInLeft(item, { stagger: 0.3 });
        createScrollTrigger(item, animation, { start: 'top 90%' });
      });
    }
  }, [filteredProjects]);

  useEffect(() => {
    if (buttonRef.current) {
      console.log("Magnetic effect applied to View Project button");
      const cleanup = createMagneticEffect(buttonRef.current, 40);
      return cleanup;
    }
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelectorAll(".title-animation"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        });
      }

      if (filterRef.current) {
        const buttons = filterRef.current.querySelectorAll(".filter-btn");
        console.log("Filter buttons found:", buttons.length); // Debug log
        // Initialize buttons as visible
        gsap.set(buttons, { opacity: 1, y: 0 });
        // Optional: Add entrance animation
        gsap.from(buttons, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 95%", // Adjusted for earlier trigger
            toggleActions: "play none none reset",
          },
        });

        // Add hover effects
        buttons.forEach((btn) => {
          const handleEnter = () => {
            if (!btn.classList.contains("active")) {
              gsap.to(btn, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out",
              });
            }
          };
          const handleLeave = () => {
            if (!btn.classList.contains("active")) {
              gsap.to(btn, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
              });
            }
          };
          btn.addEventListener("mouseenter", handleEnter);
          btn.addEventListener("mouseleave", handleLeave);
          btn._cleanup = () => {
            btn.removeEventListener("mouseenter", handleEnter);
            btn.removeEventListener("mouseleave", handleLeave);
          };
        });
      }

      const animateProjects = () => {
        if (!projectsRef.current) return;
        const projects = projectsRef.current.querySelectorAll(".project-item");
        gsap.from(projects, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      };

      const setupHoverAnimations = () => {
        if (!projectsRef.current) return;
        const projects = projectsRef.current.querySelectorAll(".project-item");
        projects.forEach((project) => {
          const projectOverlay = project.querySelector(".project-overlay");
          const projectContent = project.querySelector(".project-content");
          const projectImage = project.querySelector(".project-image");
          const projectTags = project.querySelectorAll(".project-tag");

          const hoverTl = gsap.timeline({ paused: true });

          hoverTl
            .to(projectOverlay, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            })
            .to(
              projectImage,
              {
                scale: 1.1,
                duration: 0.7,
                ease: "power2.out",
              },
              "-=0.4"
            )
            .from(
              projectContent.querySelectorAll("h3, p"),
              {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.3"
            )
            .from(
              projectTags,
              {
                y: 15,
                opacity: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.2"
            );

          project.addEventListener("mouseenter", () => {
            hoverTl.play();
          });

          project.addEventListener("mouseleave", () => {
            hoverTl.reverse();
          });
        });
      };

      setTimeout(() => {
        animateProjects();
        setupHoverAnimations();
      }, 0);
    }, portfolioRef);

    return () => {
      ctx.revert();
      if (filterRef.current) {
        const buttons = filterRef.current.querySelectorAll(".filter-btn");
        buttons.forEach((btn) => btn._cleanup && btn._cleanup());
      }
    };
  }, []);

  const handleFilterClick = (category) => {
    setActiveFilter(category);

    if (filterRef.current) {
      const buttons = filterRef.current.querySelectorAll(".filter-btn");
      console.log("Filter click:", category, "Buttons:", buttons.length); // Debug log
      buttons.forEach((btn) => {
        const isActive = btn.getAttribute("data-category") === category;
        gsap.to(btn, {
          scale: isActive ? 1.1 : 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
        btn.classList.toggle("active", isActive);
      });
    }

    if (projectsRef.current) {
      gsap.to(projectsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(projectsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  };

  return (
    <section ref={portfolioRef} className="portfolio" id="portfolio" data-bgcolor="#0a0a20">
      <div className="container">
        <div ref={titleRef} className="section-title">
          <h2 className="title-animation">Our Portfolio</h2>
          <p className="title-animation">
            Explore our collection of interactive and animated projects showcasing
            the power of GSAP and creative web development
          </p>
        </div>
        <div ref={filterRef} className="portfolio-filter">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            data-category="all"
            onClick={() => handleFilterClick("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === "animation" ? "active" : ""}`}
            data-category="animation"
            onClick={() => handleFilterClick("animation")}
          >
            Animation
          </button>
          <button
            className={`filter-btn ${activeFilter === "interaction" ? "active" : ""}`}
            data-category="interaction"
            onClick={() => handleFilterClick("interaction")}
          >
            Interaction
          </button>
          <button
            className={`filter-btn ${activeFilter === "3d" ? "active" : ""}`}
            data-category="3d"
            onClick={() => handleFilterClick("3d")}
          >
            3D Experiences
          </button>
        </div>
        <DotsGrid className="portfolio-bg" />
        <div ref={projectsRef} className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-item ${project.category}`}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay"></div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="portfolio-decorations">
        <div className="portfolio-decoration decoration-1"></div>
        <div className="portfolio-decoration decoration-2"></div>
      </div>
    </section>
  );
};

export default Portfolio;