import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Header.css";

export default function DropDownMenu({ parentRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const portalRoot = document.getElementById("portal-root");

  useEffect(() => {
    if (parentRef) {
      const rect = parentRef.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }
  }, [parentRef]);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="dropdown-menu shadow-md shadow-green-300 p-4 border border-gray-200"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    portalRoot
  );
}
