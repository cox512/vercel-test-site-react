"use client";

import { useState } from "react";
import { update } from "@intercom/messenger-js-sdk";
import { attemptAutoRecovery } from "./IntercomProvider";
import { addJWTToUpdateData } from "../utils/jwt";

export default function CustomAttributesForm() {
  const [formData, setFormData] = useState({
    attribute_name: "",
    attribute_value: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.attribute_name || !formData.attribute_value) {
      alert("Please fill in both attribute name and value");
      return;
    }

    // Try auto-recovery first
    if (!attemptAutoRecovery()) {
      alert(
        "Intercom is currently shut down. Use 'Load as Anonymous Visitor' button in the Action Buttons section for immediate recovery."
      );
      return;
    }

    // Create an object with the custom attribute
    const customData = {
      [formData.attribute_name]: formData.attribute_value,
    };

    // Add JWT token if possible
    let finalUpdateData = customData;
    try {
      finalUpdateData = await addJWTToUpdateData(customData);
    } catch (error) {
      console.warn(
        "JWT generation failed for update, proceeding without JWT:",
        error
      );
    }

    // Update the user with the custom attribute using the official SDK
    try {
      update(finalUpdateData);
      console.log("Intercom updated with custom data:", finalUpdateData);
      alert("Custom attribute updated successfully!");
    } catch (error) {
      console.error("Error updating Intercom:", error);
      alert("Error updating custom attribute. Check console for details.");
    }
  };

  const clearForm = () => {
    setFormData({
      attribute_name: "",
      attribute_value: "",
    });
  };

  return (
    <div className="form-container">
      <h3>Custom Attributes</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="attribute_name">Attribute Name:</label>
          <input
            type="text"
            id="attribute_name"
            name="attribute_name"
            value={formData.attribute_name}
            onChange={handleChange}
            required
            placeholder="e.g., subscription_plan"
          />
        </div>
        <div className="form-group">
          <label htmlFor="attribute_value">Attribute Value:</label>
          <input
            type="text"
            id="attribute_value"
            name="attribute_value"
            value={formData.attribute_value}
            onChange={handleChange}
            required
            placeholder="e.g., premium"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Update Attributes
          </button>
          <button type="button" className="clear-btn" onClick={clearForm}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
