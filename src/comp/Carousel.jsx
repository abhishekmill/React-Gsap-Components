import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Marquee = ({ children, direction = "left", speed = 3 }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const distance = marqueeElement.scrollWidth / 2;

    gsap.fromTo(
      marqueeElement,
      { x: direction === "left" ? 0 : -distance },
      {
        x: direction === "left" ? -distance : 0,
        duration: speed,
        ease: "none",
        repeat: -2,
      }
    );
  }, [direction, speed]);

  return (
    <div className="overflow-hidden w-full whitespace-nowrap">
      <div ref={marqueeRef} className="flex ">
        <div className="inline-block">{children}</div>
        <div className="inline-block">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
