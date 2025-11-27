import React from "react";

export default function TopicsCard({ allowedTopics }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>Allowed MQTT Topics</h2>
        <span className="badge">{allowedTopics.length}</span>
      </div>
      <div className="card-body">
        {allowedTopics.length > 0 ? (
          <ul className="topic-list">
            {allowedTopics.map((topic, index) => (
              <li key={index} className="topic-item">
                <span className="topic-icon">📡</span>
                {topic}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No topics assigned</p>
        )}
      </div>
    </section>
  );
}
