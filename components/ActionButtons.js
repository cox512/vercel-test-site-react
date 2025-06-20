"use client";

import { update, shutdown } from "@intercom/messenger-js-sdk";

export default function ActionButtons() {
  const performEmptyUpdate = () => {
    try {
      update({
        last_request_at: parseInt(new Date().getTime() / 1000),
      });
      console.log(
        "Intercom empty update performed at:",
        new Date().toISOString()
      );
    } catch (error) {
      console.error("Error performing Intercom update:", error);
      alert("Error performing update. Check console for details.");
    }
  };

  const performShutdown = () => {
    try {
      shutdown();
      console.log("Intercom shutdown performed");
    } catch (error) {
      console.error("Error performing Intercom shutdown:", error);
      alert("Error performing shutdown. Check console for details.");
    }
  };

  return (
    <div className="action-buttons">
      <button
        type="button"
        className="empty-update-btn"
        onClick={performEmptyUpdate}
      >
        Empty Update
      </button>
      <button type="button" className="shutdown-btn" onClick={performShutdown}>
        Shutdown
      </button>
    </div>
  );
}
