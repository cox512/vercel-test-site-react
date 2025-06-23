"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {children}
      </div>
    </>
  );
}
