"use client";

import Link from "next/link";
import { startTour, startSurvey, trackEvent } from "@intercom/messenger-js-sdk";

export default function Sidebar({ isOpen, onToggle }) {
  const handleStartTour = (tourId) => {
    try {
      startTour(tourId);
      console.log("Intercom tour started:", tourId);
    } catch (error) {
      console.error("Error starting tour:", error);
    }
  };

  const handleStartSurvey = (surveyId) => {
    try {
      startSurvey(surveyId);
      console.log("Intercom survey started:", surveyId);
    } catch (error) {
      console.error("Error starting survey:", error);
    }
  };

  const handleTrackEvent = (eventName) => {
    try {
      trackEvent(eventName);
      console.log("Intercom event tracked:", eventName);
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  };

  const handleNewTabClick = (e) => {
    e.preventDefault();
    // Open in new tab - update method will be called on the destination page
    window.open("/new-tab", "_blank");
  };

  const handlePageTwoClick = (e) => {
    e.preventDefault();
    // Navigate to page two - update method will be called on the destination page
    window.location.href = "/page-two";
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-content">
          <h3 className="sidebar-title">Actions</h3>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Workflows</h4>
            <button
              type="button"
              className="sidebar-button sidebar-button-primary"
              onClick={() => handleTrackEvent("event-click")}
              data-intercom-target="bot-button"
            >
              Trigger Workflow
            </button>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Tours</h4>
            <button
              type="button"
              className="sidebar-button sidebar-button-secondary"
              onClick={() => handleStartTour(598573)}
            >
              Start Tour
            </button>
            <a
              className="sidebar-link"
              href="https://vercel-test-site-react.vercel.app?product_tour_id=598573"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tour Link
            </a>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Surveys</h4>
            <button
              type="button"
              className="sidebar-button sidebar-button-secondary"
              onClick={() => handleStartSurvey(24407803)}
            >
              Large Survey
            </button>
            <button
              type="button"
              className="sidebar-button sidebar-button-secondary"
              onClick={() => handleStartSurvey(24407890)}
            >
              Small Survey
            </button>
            <a
              className="sidebar-link"
              href="https://vercel-test-site-react.vercel.app?intercom_survey_id=24407890"
              target="_blank"
              rel="noopener noreferrer"
            >
              Survey Link
            </a>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Events</h4>
            <button
              type="button"
              className="sidebar-button sidebar-button-primary"
              onClick={() => handleTrackEvent("event-click")}
              data-intercom-target="Button"
            >
              Event-Click Event
            </button>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Navigation</h4>
            <a
              href="/new-tab"
              target="_blank"
              onClick={handleNewTabClick}
              className="sidebar-link"
            >
              New Tab
            </a>
            <a
              href="/page-two"
              onClick={handlePageTwoClick}
              className="sidebar-link"
            >
              Page Two
            </a>
          </div>
          <div className="sidebar-section">
            <a
              className="sidebar-button sidebar-button-help-icon"
              href="https://intercom.help/narnia-4d7ae34e3be0"
              target="_blank"
              rel="noopener noreferrer"
              title="Help Center"
            >
              <img
                src="/helpcenter-svgrepo-com.svg"
                alt="Help Center"
                className="help-center-icon"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? "←" : "→"}
      </button>
    </>
  );
}
