import { useEffect, useState } from "react";
import "./App.css";
import Greeter from "./components/Greeter";
import Keycloak from "keycloak-js";
import TopNavBar from "./components/TopNavBar";

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [allowedTopics, setAllowedTopics] = useState([]);
  const [realmRoles, setRealmRoles] = useState([]);

  useEffect(() => {
    const kc = new Keycloak({
      url: "http://localhost:8080/",
      realm: "smartocean-testrealm",
      clientId: "MQTT-user-client",
    });

    kc.init({ onLoad: "login-required" }).then((auth) => {
      setKeycloak(kc);
      setAuthenticated(auth);

      if (auth) {
        kc.loadUserProfile().then((profile) => {
          setProfile(profile);
        });

        const groups = kc.tokenParsed?.groups || [];
        setUserGroups(groups);

        const topics = kc.tokenParsed?.allowed_topics || [];
        setAllowedTopics(topics);

        const roles = kc.tokenParsed?.realm_access?.roles || [];
        setRealmRoles(roles);
      }
    });
  }, []);

  if (!keycloak) {
    return <div className="loading-screen">🌊 Loading Smart Ocean...</div>;
  }

  const logout = () => {
    keycloak.logout();
  };

  if (!authenticated || !profile) {
    return <div className="loading-screen">Unable to authenticate</div>;
  }

  return (
    <div className="app-wrapper">
      <TopNavBar profile={profile} logout={logout} />

      {/* Main Dashboard Content */}
      <main className="dashboard-container">
        {/* Welcome Card */}
        <section className="card welcome-card">
          <Greeter realm={keycloak.realm} />
        </section>

        <div className="grid-layout">
          {/* Groups Card */}
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

          {/* MQTT Topics Card */}
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

          {/* Groups Card */}
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
        </div>
      </main>
    </div>
  );
}

export default App;
