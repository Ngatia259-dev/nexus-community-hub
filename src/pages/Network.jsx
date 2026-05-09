import { useState } from "react";
import styles from "./Network.module.css";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import Badge from "../components/shared/Badge";

const mockUsers = [
  {
    id: 1,
    name: "Alice Wanjiru",
    username: "bella1234-ai",
    role: "Frontend Developer",
    skills: ["React", "CSS"],
    connected: false,
  },
  {
    id: 2,
    name: "John Kamau",
    username: "kmwota-hub",
    role: "UI Designer",
    skills: ["Figma", "CSS Modules"],
    connected: false,
  },
  {
    id: 3,
    name: "Sarah Otieno",
    username: "essyken",
    role: "Full Stack Developer",
    skills: ["Node.js", "React"],
    connected: false,
  },
  {
    id: 4,
    name: "Mark Chege",
    username: "Markchege10-ux",
    role: "UX Designer",
    skills: ["Animations", "Responsive Design"],
    connected: false,
  },
  {
    id: 5,
    name: "Wynn Dev",
    username: "wynnexdev",
    role: "Backend Developer",
    skills: ["Node.js", "MongoDB"],
    connected: false,
  },
];

export default function Network() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  const toggleConnect = (id) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, connected: !user.connected } : user
    ));
  };

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const connections = users.filter((u) => u.connected);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Networking</h1>
        <p className={styles.subtitle}>
          Connect with your teammates
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>
            {connections.length}
          </span>
          <span className={styles.statLabel}>Connections</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>{users.length}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
      </div>

      <input
        className={styles.search}
        type="text"
        placeholder="Search by name or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.grid}>
        {filtered.map((user) => (
          <Card key={user.id}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                {user.name.charAt(0)}
              </div>
              <h3 className={styles.name}>{user.name}</h3>
              <p className={styles.username}>@{user.username}</p>
              <p className={styles.role}>{user.role}</p>
              <div className={styles.skills}>
                {user.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
              <Button
                onClick={() => toggleConnect(user.id)}
              >
                {user.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {connections.length > 0 && (
        <div className={styles.connectionsSection}>
          <h2 className={styles.sectionTitle}>
            Your Connections
          </h2>
          <div className={styles.connectionsList}>
            {connections.map((user) => (
              <div key={user.id} className={styles.connectionItem}>
                <div className={styles.smallAvatar}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className={styles.connectionName}>
                    {user.name}
                  </p>
                  <p className={styles.connectionRole}>
                    {user.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}