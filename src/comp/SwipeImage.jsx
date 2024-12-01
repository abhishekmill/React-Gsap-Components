import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SwipeImageContainer = ({ imageSrc, children }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const image = imageRef.current;

    gsap.set(image, { yPercent: -50, xPercent: -50 });

    const setX = gsap.quickSetter(image, "x", "px");
    const setY = gsap.quickSetter(image, "y", "px");

    const align = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const startFollow = () => document.addEventListener("mousemove", align);
    const stopFollow = () => document.removeEventListener("mousemove", align);

    const fade = gsap.to(image, {
      autoAlpha: 1,
      ease: "none",
      paused: true,
      onReverseComplete: stopFollow,
    });

    const handleMouseEnter = (e) => {
      fade.play();
      startFollow();
      align(e);
    };

    const handleMouseLeave = () => fade.reverse();

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on unmount
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="container bg-red-500 w-full py-10 inline-block hover:bg-slate-600 relative"
    >
      <img
        ref={imageRef}
        className="swipeimage absolute top-0 left-0 w-52 h-52 object-cover z-10 opacity-0 pointer-events-none"
        src={imageSrc}
        alt="Swipe Effect"
      />
      <div className="text">{children}</div>
    </div>
  );
};

export default SwipeImageContainer;
