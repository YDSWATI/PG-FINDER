// src/pages/OwnerMyProfile.jsx

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OwnerMyProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>

        <div style={styles.leftHeader}>

          <div style={styles.avatar}>
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>

          <div>

            <h1 style={styles.name}>
              {user?.name || "Owner"}
            </h1>

            <p style={styles.email}>
              {user?.email}
            </p>

          </div>

        </div>

        <button
          style={styles.editBtn}
          onClick={() => navigate("/updateProfile")}
        >
          Edit Profile
        </button>

      </div>

      {/* Top Grid */}
      <div style={styles.topGrid}>

        {/* Owner Info */}
        <div style={styles.card}>

          <div style={styles.cardTitle}>
            Owner Information
          </div>

          <div style={styles.infoGrid}>

            <div style={styles.infoBox}>
              <span style={styles.label}>Full Name</span>
              <span style={styles.value}>
                {user?.name || "Not added"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.label}>Email</span>
              <span style={styles.value}>
                {user?.email || "Not added"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.label}>Phone</span>
              <span style={styles.value}>
                {user?.phone || "Not added"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.label}>City</span>
              <span style={styles.value}>
                {user?.city || "Not added"}
              </span>
            </div>

          </div>

        </div>

        {/* Quick Stats */}
        <div style={styles.statsWrapper}>

          <div style={styles.smallCard}>
            <h2 style={styles.statNumber}>
              {user?.listings?.length || 0}
            </h2>

            <p style={styles.statText}>
              Active Listings
            </p>
          </div>

          <div style={styles.smallCard}>
            <h2 style={{ ...styles.statNumber, color: "#4ade80" }}>
              Verified
            </h2>

            <p style={styles.statText}>
              Account Status
            </p>
          </div>

        </div>

      </div>

      {/* About */}
      <div style={styles.card}>

        <div style={styles.cardTitle}>
          About Owner
        </div>

        <p style={styles.about}>
          {
            user?.bio ||
            "No bio added yet. Tell seekers about yourself and your properties."
          }
        </p>

      </div>

      {/* Listing Preferences
      <div style={styles.card}>

        <div style={styles.cardTitle}>
          Property Preferences
        </div>

        <div style={styles.tags}>

          <div style={styles.tag}>
            Boys PG
          </div>

          <div style={styles.tag}>
            Girls PG
          </div>

          <div style={styles.tag}>
            Wifi
          </div>

          <div style={styles.tag}>
            Food Included
          </div>

          <div style={styles.tag}>
            AC Rooms
          </div>

        </div>

      </div> */}

      {/* Bottom Actions */}
      <div style={styles.bottomActions}>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/owner/listings")}
        >
          View My Listings
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/createpg")}
        >
          Add New Listing
        </button>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#0c0c0f",
    color: "#fff",
    padding: "30px",
    fontFamily: "'DM Sans', sans-serif",
  },

  header: {
    background: "#131318",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "24px",
    padding: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "24px",
  },

  leftHeader: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c6ff7,#f472b6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    fontWeight: "700",
  },

  name: {
    fontSize: "28px",
    marginBottom: "6px",
  },

  email: {
    color: "#8b8a9e",
    fontSize: "14px",
  },

  editBtn: {
    background: "#7c6ff7",
    border: "none",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    background: "#131318",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "20px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "16px",
  },

  infoBox: {
    background: "#1a1a22",
    padding: "16px",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "12px",
    color: "#8b8a9e",
  },

  value: {
    fontSize: "15px",
    fontWeight: "600",
  },

  statsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  smallCard: {
    background: "#131318",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "28px",
    flex: 1,
  },

  statNumber: {
    fontSize: "34px",
    color: "#7c6ff7",
    marginBottom: "10px",
  },

  statText: {
    color: "#8b8a9e",
    fontSize: "14px",
  },

  about: {
    color: "#b4b4c7",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  tag: {
    background: "#1a1a22",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "10px 16px",
    borderRadius: "999px",
    fontSize: "13px",
    color: "#d1d5db",
  },

  bottomActions: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#7c6ff7",
    border: "none",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "#1a1a22",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "600",
  },

};