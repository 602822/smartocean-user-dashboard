import { useEffect, useState } from "react";
import "./App.css";
import Keycloak from "keycloak-js";
import TopNavBar from "./components/TopNavBar";
import GroupsCard from "./components/GroupsCard";
import TopicsCard from "./components/TopicsCard";
import RealmRolesCard from "./components/RealmRolesCard";
import WelcomeCard from "./components/WelcomeCard";

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

        // Token refresh setup
        const refreshInterval = setInterval(() => {
          kc.updateToken(30)
            .then((refreshed) => {
              if (refreshed) {
                console.log("Token refreshed:", new Date());
              }
            })
            .catch(() => {
              console.log("Token refresh failed, forcing logout");
              kc.logout();
            });
        }, 10000);

        return () => clearInterval(refreshInterval); // cleanup
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
        <WelcomeCard realm={keycloak.realm} />

        <div className="grid-layout">
          <GroupsCard userGroups={userGroups} />

          <TopicsCard allowedTopics={allowedTopics} />

          <RealmRolesCard realmRoles={realmRoles} />
        </div>
      </main>
    </div>
  );
}

export default App;
