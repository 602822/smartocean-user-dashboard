import React from "react";

export default function RealmRolesCard({ realmRoles }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>My Realm Roles</h2>
        <span className="badge">{realmRoles.length}</span>
      </div>
      <div className="card-body">
        {realmRoles.length > 0 ? (
          <ul className="tag-list">
            {realmRoles.map((role, index) => (
              <li key={index} className="tag group-tag">
                {role}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No realm roles assigned</p>
        )}
      </div>
    </section>
  );
}
