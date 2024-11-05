import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const ParallaxContainer = ({
  icon = "x",
  hoverColor = "blue-600",
  defaultColor = "gray-500",
}) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    const icon = iconRef.current;

    const handleMouseLeave = () => {
      gsap.to(container, { duration: 0.3 });
      gsap.to([circle, icon], { duration: 0.3, scale: 1, x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      gsap.to(container, { duration: 0.3 });
      gsap.to(circle, { duration: 0.3, scale: 1 });
    };

    const handleMouseMove = (e) => {
      callParallax(e);
    };

    const callParallax = (e) => {
      parallaxIt(e, circle, 20);
      parallaxIt(e, icon, 30);
    };

    const parallaxIt = (e, target, movement) => {
      const relX = e.pageX - container.getBoundingClientRect().left;
      const relY = e.pageY - container.getBoundingClientRect().top;
      gsap.to(target, {
        duration: 0.3,
        x:
          ((relX - container.offsetWidth / 2) / container.offsetWidth) *
          movement,
        y:
          ((relY - container.offsetHeight / 2) / container.offsetHeight) *
          movement,
        ease: "power2.out",
      });
    };

    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group flex justify-center items-center relative w-[70px] h-[70px] overflow-hidden"
    >
      <div
        ref={circleRef}
        className={`circle  absolute duration-150 h-[50px] w-[50px] border-2 m-10 rounded-full border-${defaultColor} group-hover:border-${hoverColor}`}
      ></div>
      <div
        ref={iconRef}
        className={`icon text-center items-center 
         group-hover:text-blue-800 `}
      >
        {icon}
      </div>
    </div>
  );
};

export default ParallaxContainer;
