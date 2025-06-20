"use client";

import { useState } from "react";
import {trackEvent} from "@intercom/messenger-js-sdk";

export default function TrackEventForm() {
  const [formData, setFormData] = useState({
    event_name: "",
    metadata_name: "",
    metadata_value: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventName = formData.event_name.toLowerCase();
    const metadataName = formData.metadata_name.toLowerCase();
    const metadataValue = formData.metadata_value;

    // Track event using the official SDK
    try {
      if (metadataName && metadataValue) {
        // If metadata is provided, create metadata object
        const metadata = {
          [metadataName]: metadataValue,
        };
        trackEvent(eventName, metadata);
        console.log(
          "Intercom event tracked:",
          eventName,
          "with metadata:",
          metadata
        );
      } else {
        // If no metadata, just track the event
        trackEvent(eventName);
        console.log("Intercom event tracked:", eventName);
      }
    } catch (error) {
      console.error("Error tracking Intercom event:", error);
      alert("Error tracking event. Check console for details.");
    }
  };

  const clearForm = () => {
    setFormData({
      event_name: "",
      metadata_name: "",
      metadata_value: "",
    });
  };

  return (
    <div className="form-container">
      <h3>Track Events 2</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event_name">Event Name:</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
            placeholder="e.g., invited-friend"
          />
        </div>
        <div className="form-group">
          <label htmlFor="metadata_name">Metadata Name:</label>
          <input
            type="text"
            id="metadata_name"
            name="metadata_name"
            value={formData.metadata_name}
            onChange={handleChange}
            placeholder="e.g., invitee_email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="metadata_value">Metadata Value:</label>
          <input
            type="text"
            id="metadata_value"
            name="metadata_value"
            value={formData.metadata_value}
            onChange={handleChange}
            placeholder="e.g., pi@example.org"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Track Event
          </button>
          <button type="button" className="clear-btn" onClick={clearForm}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
