"use client";

import { useState, useEffect } from "react";
import { update, Intercom } from "@intercom/messenger-js-sdk";
import {
  safeShutdown,
  attemptAutoRecovery,
  isInShutdownState,
  recoverAsAnonymousVisitor,
} from "./IntercomProvider";
import { addJWTToUpdateData } from "../utils/jwt";

export default function ActionButtons() {
  const [shutdownState, setShutdownState] = useState(false);

  // Check shutdown state on component mount and update when it changes
  useEffect(() => {
    setShutdownState(isInShutdownState());
  }, []);

  const performEmptyUpdate = async () => {
    // Try auto-recovery first
    if (!attemptAutoRecovery()) {
      alert(
        "Intercom is currently shut down. Use 'Load as Anonymous Visitor' button below for immediate recovery."
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
        "Intercom empty update performed at:",
        new Date().toISOString(),
        "with data:",
        finalUpdateData
      );

      // Update shutdown state after successful operation
      setShutdownState(false);
    } catch (error) {
      console.error("Error performing Intercom update:", error);
      alert("Error performing update. Check console for details.");
    }
  };

  const performShutdown = () => {
    try {
      safeShutdown();
      setShutdownState(true);
      console.log("Intercom safely shut down");
      alert(
        "Intercom has been shut down. Click 'Load as Anonymous Visitor' below for immediate recovery."
      );
    } catch (error) {
      console.error("Error performing Intercom shutdown:", error);
      alert("Error performing shutdown. Check console for details.");
    }
  };

  const handleAnonymousRecovery = () => {
    try {
      const success = recoverAsAnonymousVisitor();
      if (success) {
        setShutdownState(false);
        alert("Intercom has been loaded as an anonymous visitor!");
      } else {
        alert("Error recovering Intercom. Check console for details.");
      }
    } catch (error) {
      console.error("Error during anonymous recovery:", error);
      alert("Error during recovery. Check console for details.");
    }
  };

  return (
    <div className="action-buttons">
      <button
        type="button"
        className="empty-update-btn"
        onClick={performEmptyUpdate}
        title={shutdownState ? "Will attempt auto-recovery when clicked" : ""}
      >
        Empty Update
      </button>
      <button
        type="button"
        className="shutdown-btn"
        onClick={performShutdown}
        disabled={shutdownState}
        title={shutdownState ? "Intercom is already shut down" : ""}
      >
        Shutdown
      </button>
      {shutdownState && (
        <button
          type="button"
          className="anonymous-recovery-btn"
          onClick={handleAnonymousRecovery}
        >
          Load as Anonymous Visitor
        </button>
      )}
    </div>
  );
}
