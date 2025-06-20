"use client";

import { useState } from "react";
import { startTour } from "@intercom/messenger-js-sdk";

export default function TourForm() {
  const [tourId, setTourId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedTourId = parseInt(tourId);

    if (parsedTourId) {
      try {
        startTour(parsedTourId);
        console.log("Intercom tour started with ID:", parsedTourId);
      } catch (error) {
        console.error("Error starting Intercom tour:", error);
      }
    } else {
      alert("Please enter a valid tour ID");
    }
  };

  const clearForm = () => {
    setTourId("");
  };

  return (
    <div className="form-container">
      <h3>Trigger Tour</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tour_id">Tour ID:</label>
          <input
            type="number"
            id="tour_id"
            name="tour_id"
            value={tourId}
            onChange={(e) => setTourId(e.target.value)}
            required
            placeholder="e.g., 123"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Start Tour
          </button>
          <button type="button" className="clear-btn" onClick={clearForm}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
