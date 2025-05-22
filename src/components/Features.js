import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Features.css";

const Features = () => {
  const featuresRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const featureItemsRef = useRef([]);
  const imageRef = useRef(null);

  const addToFeatureRefs = (el) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current.push(el);
    }
  };

  const resetFeatureRefs = () => {
    featureItemsRef.current = [];
  };

  useEffect(() => {
    resetFeatureRefs();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(titleRef.current.querySelectorAll(".title-animation"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(timelineRef.current, {
        scaleY: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      });

      featureItemsRef.current.forEach((item, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        const timelineDot = item.querySelector(".timeline-dot");
        const contentBox = item.querySelector(".feature-content");
        const contentTitle = item.querySelector("h3");
        const contentText = item.querySelector("p");

        tl.from(timelineDot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        })
          .from(
            contentBox,
            {
              x: index % 2 === 0 ? -50 : 50,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.3"
          )
          .from(
            [contentTitle, contentText],
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.4"
          );
      });

      gsap.from(imageRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(imageRef.current, {
        y: 20,
        rotation: 3,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const handleImageMouseMove = (e) => {
        const imgContainer = imageRef.current;
        const { offsetWidth: width, offsetHeight: height } = imgContainer;
        const { clientX, clientY } = e;
        const x = clientX - imgContainer.getBoundingClientRect().left;
        const y = clientY - imgContainer.getBoundingClientRect().top;

        const moveX = (x / width - 0.5) * 25;
        const moveY = (y / height - 0.5) * 25;

        gsap.to(imgContainer, {
          rotationY: moveX,
          rotationX: -moveY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power1.out",
        });
      };

      const handleImageMouseLeave = () => {
        gsap.to(imageRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      if (imageRef.current) {
        imageRef.current.addEventListener("mousemove", handleImageMouseMove);
        imageRef.current.addEventListener("mouseleave", handleImageMouseLeave);
      }

      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener(
            "mousemove",
            handleImageMouseMove
          );
          imageRef.current.removeEventListener(
            "mouseleave",
            handleImageMouseLeave
          );
        }
      };
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  const featuresList = [
    {
      id: 1,
      title: "Seamless Animation Sequences",
      description:
        "Create complex animation sequences with precise timing control and synchronization between multiple elements.",
    },
    {
      id: 2,
      title: "Scroll-Triggered Animations",
      description:
        "Trigger animations based on scroll position to create engaging, interactive storytelling experiences.",
    },
    {
      id: 3,
      title: "Physics-Based Movements",
      description:
        "Implement realistic physics for natural and organic motion effects that respond to user interactions.",
    },
    {
      id: 4,
      title: "3D Transformations",
      description:
        "Add depth to your designs with powerful 3D transformations that work across all modern browsers.",
    },
    {
      id: 5,
      title: "Motion Path Animations",
      description:
        "Animate elements along custom paths for creative and unique movement patterns.",
    },
  ];

  return (
    <section ref={featuresRef} className='features' id="features" data-bgcolor='#f8f9fa'>
      <div className='container'>
        <div ref={titleRef} className='section-title'>
          <h2 className='title-animation'>GSAP Features</h2>
          <p className='title-animation'>
            Discover the powerful animation capabilities that make GSAP the
            developer's choice for creating stunning web experiences
          </p>
        </div>

        <div className='features-content'>
          <div className='features-timeline'>
            <div ref={timelineRef} className='timeline-line'></div>

            <div className='timeline-items'>
              {featuresList.map((feature, index) => (
                <div
                  ref={addToFeatureRefs}
                  key={feature.id}
                  className={`feature-item ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                >
                  <div className='timeline-dot'></div>
                  <div className='feature-content'>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className='features-image'>
            <div className='image-container'>
              <div className='image-overlay'></div>
              <div className='image-code'>
                <pre>
                  <span className='code-keyword'>gsap</span>.timeline() .from(
                  <span className='code-string'>".element"</span>, {"{"}
                  y: 100, opacity: 0, duration: 1, ease:{" "}
                  <span className='code-string'>"power3.out"</span>
                  {"}"}) .to(<span className='code-string'>".element"</span>,{" "}
                  {"{"}
                  rotation: 360, scale: 1.2, duration: 0.8
                  {"}"});
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='features-decorations'>
        <div className='decoration decoration-1'></div>
        <div className='decoration decoration-2'></div>
        <div className='decoration decoration-3'></div>
      </div>
    </section>
  );
};

export default Features;