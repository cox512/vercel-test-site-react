"use client";

import Link from "next/link";
import { startTour, startSurvey, trackEvent } from "@intercom/messenger-js-sdk";

export default function BotButtons() {
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

  return (
    <div className="bot-buttons">
      <div className="button-row">
        <button
          type="button"
          className="button-bot button-one"
          onClick={() => handleTrackEvent("event-click")}
          data-intercom-target="Button"
        >
          Bot Button 1
        </button>
        <button
          type="button"
          className="button-bot button-two"
          onClick={() => handleTrackEvent("event-click")}
          data-intercom-target="Button"
        >
          Bot Button 2
        </button>
      </div>

      {/* FIX TOUR BUTTON AND TOUR LINK*/}
      <div className="button-row">
        <button
          type="button"
          className="button-tour-one"
          onClick={() => handleStartTour(598573)}
        >
          Tour Button
        </button>

        <a
          className="tour_link"
          href="https://vercel-test-site-react.vercel.app?product_tour_id=598573"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tour Link
        </a>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="button-survey-one"
          onClick={() => handleStartSurvey(24407803)}
        >
          Large Survey
        </button>
        <button
          type="button"
          className="button-survey-two"
          onClick={() => handleStartSurvey(24407890)}
        >
          Small Survey
        </button>
        <a
          className="survey_link"
          href="https://vercel-test-site-react.vercel.app?intercom_survey_id=24407890"
          target="_blank"
          rel="noopener noreferrer"
        >
          Survey Link
        </a>
      </div>
      <div className="button-row">
        <a
          className="button-help-center"
          href="https://intercom.help/narnia-4d7ae34e3be0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Help Center
        </a>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="button-bot button-one"
          onClick={() => handleTrackEvent("event-click")}
          data-intercom-target="Button"
        >
          Event-Click Event
        </button>

      </div>
      <div className="button-row">
        <Link href="/new-tab" target="_blank">
          Link to a new tab
        </Link>
      </div>
      <div className="button-row">
        <Link href="/page-two">Page Two</Link>
      </div>
    </div>
  );
}
