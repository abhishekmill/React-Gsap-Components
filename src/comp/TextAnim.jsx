import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = ({ className, children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    // Function to load SplitType script dynamically
    const loadSplitType = () => {
      return new Promise((resolve) => {
        if (window.SplitType) {
          resolve(); // Already loaded
        } else {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/split-type";
          script.async = true;
          script.onload = () => resolve(); // Resolve when loaded
          document.body.appendChild(script);
        }
      });
    };
    console.log(children);

    // Load SplitType and then animate
    loadSplitType().then(() => {
      const SplitType = window.SplitType;
      const typeSplit = new SplitType(textRef.current, {
        types: "lines, words, chars",
        tagName: "span",
      });

      // Animate each word in the text
      gsap.from(textRef.current.querySelectorAll(".word"), {
        y: "100%",
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
      });
    });
  }, []);

  return (
    <div
      ref={textRef}
      animate="true"
      className={`overflow-hidden ${className} `}
    >
      {children
        ? children
        : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, alias at. Reiciendis quasi dicta nisi veritatis error distinctio magnam? Similique?"}
    </div>
  );
};

export default AnimatedText;
