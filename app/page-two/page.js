"use client";

import { useState, useEffect } from "react";

export default function PageTwo() {
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    // Remove all background color classes
    document.body.classList.remove(
      "bg-orange",
      "bg-red",
      "bg-green",
      "bg-blue"
    );

    // Add the selected color class if a color was chosen
    if (selectedColor) {
      document.body.classList.add(`bg-${selectedColor}`);
    }

    // Cleanup function to remove classes when component unmounts
    return () => {
      document.body.classList.remove(
        "bg-orange",
        "bg-red",
        "bg-green",
        "bg-blue"
      );
    };
  }, [selectedColor]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="message-container">
      <h1 className="message">Choose a background color</h1>
      <div className="color-selector">
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">Select a color</option>
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </div>
  );
}
