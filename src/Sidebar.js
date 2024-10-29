import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ isVisible, toggleSidebar }) {
  return (
    <aside className={`sidebar ${isVisible ? "visible" : ""}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="menu-button">
          <Menu className="menu-icon" />
        </button>

      </div>
      <nav className="nav">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/interview">Interview</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/Settings">Settings</Link>
        <Link className="nav-logout" to="/">Logout</Link>

      </nav>
    </aside>
  );
}
