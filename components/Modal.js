"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  blocking = false,
}) {
  // Handle ESC key to close modal (unless blocking)
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && !blocking) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent background scrolling and disable interactions
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose, blocking]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={blocking ? undefined : onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );

  // Render modal at document.body level to cover entire viewport
  return createPortal(modalContent, document.body);
}
