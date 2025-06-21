"use client";

import { useEffect } from "react";
import { update } from "@intercom/messenger-js-sdk";

export default function NewTab() {
  useEffect(() => {
    // Call update method after navigation to this page
    try {
      update({
        last_request_at: parseInt(new Date().getTime() / 1000),
      });
      console.log("Intercom update called after navigation to new-tab");
    } catch (error) {
      console.error("Error updating Intercom on new-tab:", error);
    }
  }, []);

  return (
    <div className="congrats-container">
      <h1 className="congrats-message">Congrats on finding me!</h1>
    </div>
  );
}
