"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";

export default function CodeBridgePage() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#373535]">
      <Navbar isExpanded={isNavExpanded} toggleNav={toggleNav} />
      <MainContent />
    </div>
  );
}
