import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ScrollMarquee = ({ children, speed = 3, direction = "left" }) => {
  const marqueeRef = useRef(null);
  const requestRef = useRef(null);
  const previousScrollRef = useRef(0);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;

    const scrollHandler = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - previousScrollRef.current;

      // Determine scroll direction and set speed
      const scrollSpeed = delta * speed * (direction === "left" ? -1 : 1);

      // Animate marquee position
      gsap.to(marqueeElement, {
        x: `+=${scrollSpeed}`, // Moves marquee based on scroll
        duration: 0.5, // Smooth transition
        ease: "power1.out",
      });

      previousScrollRef.current = currentScroll;
    };

    const handleScroll = () => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(() => {
          scrollHandler();
          requestRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [speed, direction]);

  return (
    <div className="overflow-hidden w-full whitespace-nowrap">
      <div ref={marqueeRef} className="flex">
        <div className="inline-block">{children}</div>
        <div className="inline-block">{children}</div>
      </div>
    </div>
  );
};

export default ScrollMarquee;
