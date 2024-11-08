import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    // Load SplitType and then animate
    loadSplitType().then(() => {
      const SplitType = window.SplitType;
      const typeSplit = new SplitType(textRef.current, {
        types: "lines, words, chars",
        tagName: "span",
      });

      // Animate each word in the text with ScrollTrigger
      gsap.from(textRef.current.querySelectorAll(".word"), {
        y: "100%",
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          markers: true,
          toggleActions: "play reverse reverse reverse",
        },
      });
    });
  }, []);

  return (
    <div ref={textRef} className={`overflow-hidden ${className}`}>
      {children
        ? children
        : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, alias at. Reiciendis quasi dicta nisi veritatis error distinctio magnam? Similique?"}
    </div>
  );
};

export default AnimatedText;
