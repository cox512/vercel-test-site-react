"use client";

import { useEffect } from "react";
import { update } from "@intercom/messenger-js-sdk";
import { attemptAutoRecovery } from "../../components/IntercomProvider";
import { addJWTToUpdateData } from "../../utils/jwt";

export default function NewTab() {
  useEffect(() => {
    // Call update method after navigation to this page
    const performUpdate = async () => {
      // Try auto-recovery first
      if (!attemptAutoRecovery()) {
        console.log(
          "Intercom is currently shut down. Skipping update call on new-tab page."
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
          "Intercom update called after navigation to new-tab with data:",
          finalUpdateData
        );
      } catch (error) {
        console.error("Error updating Intercom on new-tab:", error);
      }
    };

    performUpdate();
  }, []);

  return (
    <div className="congrats-container">
      <h1 className="congrats-message">Congrats on finding me!</h1>
    </div>
  );
}
