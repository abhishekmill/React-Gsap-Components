import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Marquee = ({
  children,
  direction = "left",
  speed = 3,
  hoverPause = false,
}) => {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;

    const animateMarquee = () => {
      const distance = marqueeElement.scrollWidth / 2;

      if (animationRef.current) animationRef.current.kill();

      animationRef.current = gsap.fromTo(
        marqueeElement,
        { x: direction === "left" ? 0 : -distance },
        {
          x: direction === "left" ? -distance : 0,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );
    };

    animateMarquee();
    window.addEventListener("resize", animateMarquee);

    if (hoverPause) {
      marqueeElement.addEventListener("mouseenter", () => {
        if (animationRef.current) {
          tweenRef.current = gsap.to(animationRef.current, {
            timeScale: 0.2, // Slow down to 20% speed
            duration: 0.5, // Transition duration for smooth slowdown
          });
        }
      });

      marqueeElement.addEventListener("mouseleave", () => {
        if (animationRef.current) {
          tweenRef.current = gsap.to(animationRef.current, {
            timeScale: 1, // Return to normal speed
            duration: 0.5, // Smooth transition back to original speed
          });
        }
      });
    }

    return () => {
      if (animationRef.current) animationRef.current.kill();
      window.removeEventListener("resize", animateMarquee);
      marqueeElement.removeEventListener("mouseenter", () =>
        tweenRef.current?.kill()
      );
      marqueeElement.removeEventListener("mouseleave", () =>
        tweenRef.current?.kill()
      );
    };
  }, [direction, speed, hoverPause]);

  return (
    <div className="overflow-hidden w-full whitespace-nowrap">
      <div ref={marqueeRef} className="flex">
        <div className="inline-block">{children}</div>
        <div className="inline-block">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
