"use client";

import { useState, useEffect } from "react";
import { update } from "@intercom/messenger-js-sdk";
import { attemptAutoRecovery } from "../../components/IntercomProvider";
import { addJWTToUpdateData } from "../../utils/jwt";

export default function PageTwo() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorHover, setSelectedColorHover] = useState("");
  const [isHoverDropdownOpen, setIsHoverDropdownOpen] = useState(false);

  useEffect(() => {
    // Call update method after navigation to this page
    const performUpdate = async () => {
      // Try auto-recovery first
      if (!attemptAutoRecovery()) {
        console.log(
          "Intercom is currently shut down. Skipping update call on page-two."
        );
        return;
      }

      try {
        const updateData = {
          last_request_at: parseInt(new Date().getTime() / 1000),
        };

        // Add JWT token if possible
        let finalUpdateData = updateData;
        try {
          finalUpdateData = await addJWTToUpdateData(updateData);
        } catch (error) {
          console.warn(
            "JWT generation failed for update, proceeding without JWT:",
            error
          );
        }

        update(finalUpdateData);
        console.log(
          "Intercom update called after navigation to page-two with data:",
          finalUpdateData
        );
      } catch (error) {
        console.error("Error updating Intercom on page-two:", error);
      }
    };

    performUpdate();
  }, []);

  useEffect(() => {
    // Remove all background color classes
    document.body.classList.remove(
      "bg-orange",
      "bg-red",
      "bg-green",
      "bg-blue"
    );

    // Add the selected color class if a color was chosen from either dropdown
    const activeColor = selectedColor || selectedColorHover;
    if (activeColor) {
      document.body.classList.add(`bg-${activeColor}`);
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
  }, [selectedColor, selectedColorHover]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    // Clear the hover dropdown selection when click dropdown is used
    if (e.target.value) {
      setSelectedColorHover("");
    }
  };

  const handleHoverColorChange = (color) => {
    setSelectedColorHover(color);
    setIsHoverDropdownOpen(false);
    // Clear the click dropdown selection when hover dropdown is used
    if (color) {
      setSelectedColor("");
    }
  };

  return (
    <div className="message-container">
      <h1 className="message">Product Tour Dropdown Testing</h1>
      <h2 className="message">Choose a background color</h2>

      {/* Click-based dropdown */}
      <div className="color-selector">
        <h4>Displays on click</h4>
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">Select a color</option>
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
        {selectedColor && (
          <p className="status-text">Selected: {selectedColor}</p>
        )}
      </div>

      {/* Hover-based dropdown */}
      <div className="color-selector">
        <h4>Displays on hover</h4>
        <div
          className="hover-dropdown"
          onMouseEnter={() => setIsHoverDropdownOpen(true)}
          onMouseLeave={() => setIsHoverDropdownOpen(false)}
        >
          <div className="hover-dropdown-trigger">
            {selectedColorHover || "Select a color"}
            <span className="dropdown-arrow">▼</span>
          </div>
          {isHoverDropdownOpen && (
            <div className="hover-dropdown-options">
              <div
                className="hover-option"
                onClick={() => handleHoverColorChange("")}
              >
                Select a color
              </div>
              <div
                className="hover-option"
                onClick={() => handleHoverColorChange("orange")}
              >
                Orange
              </div>
              <div
                className="hover-option"
                onClick={() => handleHoverColorChange("red")}
              >
                Red
              </div>
              <div
                className="hover-option"
                onClick={() => handleHoverColorChange("green")}
              >
                Green
              </div>
              <div
                className="hover-option"
                onClick={() => handleHoverColorChange("blue")}
              >
                Blue
              </div>
            </div>
          )}
        </div>
        {selectedColorHover && (
          <p className="status-text">Selected: {selectedColorHover}</p>
        )}
      </div>
    </div>
  );
}
