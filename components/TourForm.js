"use client";

import { useState } from "react";
import { startTour } from "@intercom/messenger-js-sdk";
import { attemptAutoRecovery } from "./IntercomProvider";

export default function TourForm({ onClose }) {
  const [tourId, setTourId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedTourId = parseInt(tourId);

    if (parsedTourId) {
      // Try auto-recovery first
      if (!attemptAutoRecovery()) {
        alert(
          "Intercom is currently shut down. Use 'Load as Anonymous Visitor' button in the Action Buttons section for immediate recovery."
        );
        return;
      }

      try {
        startTour(parsedTourId);
        console.log("Intercom tour started with ID:", parsedTourId);

        // Clear form and close modal on success
        clearForm();
        if (onClose) onClose();
      } catch (error) {
        console.error("Error starting Intercom tour:", error);

        // Clear form and close modal even on error
        clearForm();
        if (onClose) onClose();
      }
    } else {
      alert("Please enter a valid tour ID");
      // Don't close modal on validation error, just clear form
      clearForm();
    }
  };

  const clearForm = () => {
    setTourId("");
  };

  return (
    <div className="form-container">
      <h3>Trigger Tour</h3>
      <p>
        You must submit, cancel, or dismiss this modal to access the background
        UI.
      </p>
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
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              clearForm();
              if (onClose) onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
