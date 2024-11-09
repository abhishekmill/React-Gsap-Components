import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 20); // Adjust interval for desired speed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      gsap.to(".progress-wrapper", {
        scale: 1.5,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.2,
      });

      gsap.to(".revealer", {
        top: "0%",
        duration: 2.2,
        ease: "power3.inOut",
        delay: 1,
      });

      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power3.inOut",
        delay: 1.9,
        onComplete: () => {
          document.querySelector("html").classList.remove("scroll-hide");
        },
      });
    }
  }, [progress]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 loader"
    >
      <div className="progress-wrapper w-3/4 h-1 bg-gray-300 overflow-hidden mb-4">
        <div
          className="progress-bar h-full bg-gray-800"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="revealer absolute top-full left-0 w-full h-full bg-black"></div>
    </div>
  );
};

export default Preloader;
