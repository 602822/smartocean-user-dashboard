import React from "react";

export default function TopNavBar({ profile, logout }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <h1>Smart Ocean 🌊</h1>
      </div>
      <div className="header-user">
        <span className="username">
          Welcome, <strong>{profile.username}</strong>
        </span>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
