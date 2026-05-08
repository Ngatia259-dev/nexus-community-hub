import { useState } from "react";
import styles from "./Profile.module.css";
import Button from "../components/shared/Button";
import Badge from "../components/shared/Badge";
import Card from "../components/shared/Card";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Kennedy Muriithi",
    username: "muriithikennedy443-sudo",
    bio: "Full-stack developer passionate about building community tools.",
    location: "Nairobi, Kenya",
    skills: ["React", "Node.js", "MongoDB", "CSS Modules"],
  });

  return (
    <div className={styles.container}>
      <div className={styles.coverPhoto}></div>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {profile.name.charAt(0)}
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>

        <Card>
          {isEditing ? (
            <div className={styles.editForm}>
              <input
                className={styles.input}
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Your name"
              />
              <textarea
                className={styles.textarea}
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                placeholder="Your bio"
              />
              <input
                className={styles.input}
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                placeholder="Your location"
              />
            </div>
          ) : (
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{profile.name}</h1>
              <p className={styles.username}>@{profile.username}</p>
              <p className={styles.bio}>{profile.bio}</p>
              <p className={styles.location}>📍 {profile.location}</p>
            </div>
          )}
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skills}>
            {profile.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}