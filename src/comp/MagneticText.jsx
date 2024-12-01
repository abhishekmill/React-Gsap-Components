import React, { useEffect, useRef } from "react";

const MagneticText = ({
  className,
  children,
  intensity = 0.5,
  maxDistance = 200,
}) => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    const letters = Array.from(container.querySelectorAll(".letter"));

    const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const moveX = lerp(0, distanceX, force * intensity);
          const moveY = lerp(0, distanceY, force * intensity);
          letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
          letter.style.transitionDuration = "0.2s";
        } else {
          letter.style.transform = "translate(0, 0)";
          letter.style.transitionDuration = "0.5s";
        }
      });

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const handleMouseLeave = () => {
      letters.forEach((letter) => {
        letter.style.transform = "translate(0, 0)";
        letter.style.transitionDuration = "0.5s";
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, maxDistance]);

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen bg-transparent ${className}overflow-hidden flex justify-center bg-red-200 items-center `}
    >
      <div className="text-6xl font-bold   space-x-2">
        {children.split("").map((char, index) => (
          <span
            key={index}
            className="letter inline-block transition-transform"
          >
            {char}
          </span>
        ))}
      </div>
      <div
        ref={cursorRef}
        className=" fixed w-10 h-10 z-[10]  border bg-black rounded-full mix-blend-difference pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      ></div>
    </div>
  );
};

export default MagneticText;
