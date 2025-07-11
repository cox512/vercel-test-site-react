"use client";

import { useState } from "react";
import UserDataForm from "../components/UserDataForm";
import CustomAttributesForm from "../components/CustomAttributesForm";
import TrackEventForm from "../components/TrackEventForm";
import TourForm from "../components/TourForm";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";

export default function Home() {
  const [isTrackEventModalOpen, setIsTrackEventModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const closeTrackEventModal = () => setIsTrackEventModalOpen(false);
  const closeTourModal = () => setIsTourModalOpen(false);

  return (
    <main className="about__display--row">
      <h1 className="page-title">
        Intercom Test Site - NPM React installation
      </h1>
      <p className="page-description">
        Please enter your details to log in to Intercom.
      </p>

      <div className="forms-container">
        <div className="form-column">
          <UserDataForm />
          <CustomAttributesForm />
          <ActionButtons />
        </div>

        <div className="form-column">
          {/* Modal trigger buttons */}
          <div className="form-container modal-section-container">
            <h3>Modals</h3>
            <button
              className="modal-trigger-btn"
              onClick={() => setIsTrackEventModalOpen(true)}
            >
              Track Events
            </button>
            <button
              className="modal-trigger-btn"
              onClick={() => setIsTourModalOpen(true)}
            >
              Trigger Tour
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isTrackEventModalOpen}
        onClose={closeTrackEventModal}
        title="Track Events"
      >
        <TrackEventForm onClose={closeTrackEventModal} />
      </Modal>

      <Modal
        isOpen={isTourModalOpen}
        onClose={closeTourModal}
        title="Trigger Tour"
        blocking={true}
      >
        <TourForm onClose={closeTourModal} />
      </Modal>
    </main>
  );
}
