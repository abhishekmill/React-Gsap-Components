import React, { useState, useEffect } from "react";

const CustomCursor = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false); // Track pointer behavior

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Detect hover states
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.tagName === "A" || e.target.classList.contains("pointer")) {
        setIsPointer(true);
      }
    };

    const handleMouseOut = () => {
      setIsPointer(false);
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      className="w-full h-full cursor-none relative"
      style={{ overflow: "hidden" }}
    >
      {/* Custom Cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none overflow-hidden z-50 transform  ${
          isPointer ? "scale-50 " : "scale-75 "
        } rounded-full`}
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      >
        {children}
      </div>

      {/* Main Content */}
    </div>
  );
};

export default CustomCursor;
