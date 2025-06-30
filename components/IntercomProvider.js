"use client";

import { useEffect } from "react";
import { Intercom, shutdown } from "@intercom/messenger-js-sdk";

// Key for tracking shutdown state in localStorage
const SHUTDOWN_STATE_KEY = "intercom_manual_shutdown";
const SHUTDOWN_TIMESTAMP_KEY = "intercom_shutdown_timestamp";

// Auto-recovery settings
const AUTO_RECOVERY_DELAY = 10 * 60 * 1000; // 10 minutes in milliseconds
const SESSION_RECOVERY_DELAY = 5 * 60 * 1000; // 5 minutes for session-based recovery

export default function IntercomProvider({ children }) {
  useEffect(() => {
    // Check if Intercom was manually shut down in a previous session
    const wasManuallyShutdown =
      localStorage.getItem(SHUTDOWN_STATE_KEY) === "true";
    const shutdownTimestamp = localStorage.getItem(SHUTDOWN_TIMESTAMP_KEY);

    if (wasManuallyShutdown && shutdownTimestamp) {
      const timeSinceShutdown = Date.now() - parseInt(shutdownTimestamp);

      // Auto-recover if shutdown was more than 10 minutes ago
      if (timeSinceShutdown > AUTO_RECOVERY_DELAY) {
        console.log(
          "Auto-recovering from shutdown state (10+ minutes elapsed)"
        );
        clearShutdownState();
      } else {
        console.log(
          `Intercom was previously shut down ${Math.round(
            timeSinceShutdown / 1000 / 60
          )} minutes ago. Skipping initialization to prevent CORS/404 errors.`
        );
        console.log(
          "Use 'Load as Anonymous Visitor' button for immediate recovery, or auto-recovery will happen in",
          Math.round((AUTO_RECOVERY_DELAY - timeSinceShutdown) / 1000 / 60),
          "minutes."
        );
        return;
      }
    }

    // Initialize Intercom with your app ID using the official SDK
    try {
      Intercom({
        app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
      });
      console.log("Intercom initialized successfully");
    } catch (error) {
      console.error("Error initializing Intercom:", error);
    }

    // Cleanup function to shutdown Intercom when component unmounts
    return () => {
      try {
        shutdown();
        console.log("Intercom shutdown successfully");
      } catch (error) {
        console.error("Error shutting down Intercom:", error);
      }
    };
  }, []);

  return <>{children}</>;
}

// Function to safely shutdown Intercom and track the state
export function safeShutdown() {
  try {
    shutdown();
    // Mark that Intercom was manually shut down with timestamp
    localStorage.setItem(SHUTDOWN_STATE_KEY, "true");
    localStorage.setItem(SHUTDOWN_TIMESTAMP_KEY, Date.now().toString());
    console.log("Intercom safely shut down and state tracked");
  } catch (error) {
    console.error("Error performing safe shutdown:", error);
    throw error;
  }
}

// Function to clear shutdown state and allow reinitialization
export function clearShutdownState() {
  localStorage.removeItem(SHUTDOWN_STATE_KEY);
  localStorage.removeItem(SHUTDOWN_TIMESTAMP_KEY);
  console.log(
    "Shutdown state cleared. Intercom will reinitialize on next page load."
  );
}

// Function to initialize Intercom as anonymous visitor
export function initializeAsAnonymousVisitor() {
  try {
    Intercom({
      app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
    });
    console.log("Intercom initialized as anonymous visitor");
    return true;
  } catch (error) {
    console.error("Error initializing Intercom as anonymous visitor:", error);
    return false;
  }
}

// Function to recover to anonymous visitor state
export function recoverAsAnonymousVisitor() {
  try {
    clearShutdownState();
    const success = initializeAsAnonymousVisitor();
    if (success) {
      console.log("Successfully recovered as anonymous visitor");
    }
    return success;
  } catch (error) {
    console.error("Error recovering as anonymous visitor:", error);
    return false;
  }
}

// Function to check if Intercom is in shutdown state
export function isInShutdownState() {
  const wasShutdown = localStorage.getItem(SHUTDOWN_STATE_KEY) === "true";
  const shutdownTimestamp = localStorage.getItem(SHUTDOWN_TIMESTAMP_KEY);

  if (wasShutdown && shutdownTimestamp) {
    const timeSinceShutdown = Date.now() - parseInt(shutdownTimestamp);
    // Auto-clear if more than 10 minutes have passed
    if (timeSinceShutdown > AUTO_RECOVERY_DELAY) {
      clearShutdownState();
      return false;
    }
    return true;
  }

  return false;
}

// Function to attempt auto-recovery before any Intercom operation
export function attemptAutoRecovery() {
  if (isInShutdownState()) {
    const shutdownTimestamp = localStorage.getItem(SHUTDOWN_TIMESTAMP_KEY);
    const timeSinceShutdown = Date.now() - parseInt(shutdownTimestamp);

    // Auto-recover if more than 5 minutes have passed and user is trying to interact
    if (timeSinceShutdown > SESSION_RECOVERY_DELAY) {
      console.log(
        "Auto-recovering from shutdown state as anonymous visitor due to user interaction"
      );
      return recoverAsAnonymousVisitor();
    } else {
      const remainingTime = Math.round(
        (SESSION_RECOVERY_DELAY - timeSinceShutdown) / 1000 / 60
      );
      console.log(
        `Auto-recovery will be available in ${remainingTime} minute(s), or use 'Load as Anonymous Visitor' for immediate recovery.`
      );
      return false; // Still in shutdown state
    }
  }
  return true; // Not in shutdown state
}

// Export the Intercom function for use in other components
export { Intercom };
