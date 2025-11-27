import React from "react";

export default function WelcomeCard({ realm }) {
  return (
    <section className="card welcome-card">
      <div>
        <h2>Welcome to the {realm}!</h2>
      </div>
    </section>
  );
}
