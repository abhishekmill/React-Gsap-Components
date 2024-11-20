import React, { useState, useEffect } from "react";

const CustomCursor = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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

  return (
    <div
      className="w-full h-full cursor-none relative"
      style={{ overflow: "hidden" }}
    >
      {/* Custom Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      >
        <div className="flex items-center justify-center">{children}</div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
};

export default CustomCursor;
