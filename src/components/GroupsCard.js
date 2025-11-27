import React from "react";

export default function GroupsCard({ userGroups }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>My Groups</h2>
        <span className="badge">{userGroups.length}</span>
      </div>
      <div className="card-body">
        {userGroups.length > 0 ? (
          <ul className="tag-list">
            {userGroups.map((group, index) => (
              <li key={index} className="tag group-tag">
                {group}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No groups assigned</p>
        )}
      </div>
    </section>
  );
}
