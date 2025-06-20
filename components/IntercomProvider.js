"use client";

import { useEffect } from "react";
import { Intercom, shutdown } from "@intercom/messenger-js-sdk";

export default function IntercomProvider({ children }) {
  useEffect(() => {
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

// Export the Intercom function for use in other components
export { Intercom };
