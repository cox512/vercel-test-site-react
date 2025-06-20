"use client";

import { useState } from "react";
import { update } from "@intercom/messenger-js-sdk";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.attribute_name || !formData.attribute_value) {
      alert("Please fill in both attribute name and value");
      return;
    }

    // Create an object with the custom attribute
    const customData = {
      [formData.attribute_name]: formData.attribute_value,
    };

    // Update the user with the custom attribute using the official SDK
    try {
      update(customData);
      console.log("Intercom updated with custom data:", customData);
    } catch (error) {
      console.error("Error updating Intercom:", error);
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
      <h3>Add Custom Attributes</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="attribute_name">Attribute Name:</label>
          <input
            type="text"
            id="attribute_name"
            name="attribute_name"
            value={formData.attribute_name}
            onChange={handleChange}
            placeholder="e.g., subscription_type"
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
            placeholder="e.g., premium"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Update User
          </button>
          <button type="button" className="clear-btn" onClick={clearForm}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
