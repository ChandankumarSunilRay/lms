import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./common.css";
import { HiMenu } from "react-icons/hi";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-admin">
      <button
        type="button"
        className="admin-menu-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open admin menu"
      >
        <HiMenu />
        <span>Menu</span>
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
