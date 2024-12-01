import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

const RotatedText = ({ text }) => {
  const textRef = useRef();

  useEffect(() => {
    // Split the text content into lines, words, and characters
    const typeSplit = new SplitType(textRef.current, {
      types: "lines, words, chars",
      tagName: "span",
    });

    // Animate the words with a mask effect
    gsap.from(textRef.current.querySelectorAll(".word"), {
      y: "110%", // Moves from outside the container
      opacity: 1,
      rotationZ: 10,
      duration: 0.8,
      ease: "power1.out",
      stagger: 0.2,
    });

    // Cleanup when the component unmounts
    return () => {
      typeSplit.revert(); // Revert the SplitType splitting
    };
  }, []);

  return (
    <div
      style={{
        display: "inline-block", // Ensures it wraps around content
        overflow: "hidden", // Masks the animation
      }}
    >
      <div ref={textRef}>{text}</div>
    </div>
  );
};

export default RotatedText;
