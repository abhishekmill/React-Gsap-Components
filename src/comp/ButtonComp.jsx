import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = ({ text = "text", classname }) => {
  const buttonRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true, reversed: true }); // Set timeline to reversed initially

    // Define the animation sequence with fromTo
    tl.to(spanRef.current, {
      duration: 0.2,
      yPercent: -150,
      ease: "power2.in",
    }).fromTo(
      spanRef.current,
      { yPercent: 150 },
      { yPercent: 0, duration: 0.2, immediateRender: false }
    );

    // Play on mouse enter
    const handleMouseEnter = () => tl.play();

    // Reverse on mouse leave
    const handleMouseLeave = () => tl.reverse();

    const button = buttonRef.current;
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      href="#"
      ref={buttonRef}
      className="relative inline-block border-y border-black  px-4 h-fit py-2 text-center text-black overflow-hidden"
    >
      <span ref={spanRef} className={`inline-block ${classname} `}>
        {text}
      </span>
    </a>
  );
};

export default AnimatedButton;
