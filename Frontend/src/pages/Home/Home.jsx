// src/pages/common/Home.jsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Home() {

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={S.page}>

      {/* ── Navbar ───────────────────────────── */}
      <nav style={S.navbar}>

        <div style={S.logoWrap}>
          <div style={S.logoIcon}>PG</div>
          <span style={S.logoText}>PGMatch</span>
        </div>
    
        <div style={S.navActions}>
            

          {
            user ? (
              <button
                style={S.primaryBtn}
                onClick={() => {
                  if (user.role === "owner") {
                    navigate("/owner/dashboard");
                  } else {
                    navigate("/seeker/dashboard");
                  }
                }}
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button style={S.navBtn}>Login</button>
                </Link>

                <Link to="/register">
                  <button style={S.primaryBtn}>Register</button>
                </Link>
              </>
            )
          }

        </div>

      </nav>

      {/* ── Hero Section ────────────────────── */}
      <section style={S.heroSection}>

        <div style={S.heroGlow1}></div>
        <div style={S.heroGlow2}></div>

        <div style={S.heroContent}>

          <div style={S.badge}>
            Smart PG + Roommate Matching Platform
          </div>

          <h1 style={S.heroTitle}>
            Find Your Perfect
            <span style={S.gradientText}> PG & Roommate </span>
            Without The Stress
          </h1>

          <p style={S.heroDesc}>
            Discover verified PGs, connect with compatible roommates,
            chat instantly, and manage everything in one place.
          </p>

          <div style={S.heroButtons}>

            <button
              style={S.primaryHeroBtn}
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              style={S.secondaryHeroBtn}
              onClick={() => navigate("/listings")}
            >
              Explore PGs
            </button>

          </div>

        </div>

        {/* ── Hero Card ───────────────────── */}
        <div style={S.heroCard}>

          <div style={S.cardTop}>
            <div>
              <div style={S.cardTitle}>Best Match Found</div>
              <div style={S.cardSub}>Compatibility Score</div>
            </div>

            <div style={S.scoreCircle}>
              92%
            </div>
          </div>

          <div style={S.matchCard}>
            <div style={S.avatar}>AK</div>

            <div>
              <div style={S.matchName}>Aryan Kumar</div>
              <div style={S.matchMeta}>
                Night Owl • Engineering • Clean
              </div>
            </div>
          </div>

          <div style={S.progressWrap}>
            <div style={S.progressTop}>
              <span style={S.progressLabel}>Lifestyle Match</span>
              <span style={S.progressLabel}>92%</span>
            </div>

            <div style={S.progressTrack}>
              <div style={S.progressFill}></div>
            </div>
          </div>

        </div>

      </section>

      {/* ── Features ───────────────────────── */}
      <section style={S.featureSection}>

        <div style={S.sectionHead}>
          <h2 style={S.sectionTitle}>Everything You Need</h2>

          <p style={S.sectionDesc}>
            Built for students, professionals, PG owners, and seekers.
          </p>
        </div>

        <div style={S.featureGrid}>

          <div style={S.featureCard}>
            <div style={S.featureIcon}>🏠</div>

            <div style={S.featureTitle}>
              Verified PG Listings
            </div>

            <div style={S.featureText}>
              Browse modern PGs with rent, amenities,
              photos, rules, and availability.
            </div>
          </div>

          <div style={S.featureCard}>
            <div style={S.featureIcon}>🤝</div>

            <div style={S.featureTitle}>
              Smart Roommate Match
            </div>

            <div style={S.featureText}>
              Match seekers based on habits,
              food preference, sleep cycle, and lifestyle.
            </div>
          </div>

          <div style={S.featureCard}>
            <div style={S.featureIcon}>💬</div>

            <div style={S.featureTitle}>
              Real-time Chat
            </div>

            <div style={S.featureText}>
              Connect instantly with PG owners
              and compatible roommates.
            </div>
          </div>

          <div style={S.featureCard}>
            <div style={S.featureIcon}>📍</div>

            <div style={S.featureTitle}>
              City-based Discovery
            </div>

            <div style={S.featureText}>
              Find PGs and roommates in your city
              with powerful filters and recommendations.
            </div>
          </div>

        </div>

      </section>

      {/* ── CTA ───────────────────────────── */}
      <section style={S.ctaSection}>

        <div style={S.ctaCard}>

          <h2 style={S.ctaTitle}>
            Ready To Find Your Perfect Stay?
          </h2>

          <p style={S.ctaDesc}>
            Join PGMatch today and simplify your PG hunting experience.
          </p>

          

        </div>

      </section>

    </div>
  );
}


// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const S = {

  page: {
    minHeight: "100vh",
    background: "#0c0c0f",
    color: "#f0eff8",
    fontFamily: "'DM Sans', sans-serif",
  },

  navbar: {
    height: 75,
    padding: "0 60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "#131318",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#7c6ff7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
  },

  logoText: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
  },

  navActions: {
    display: "flex",
    gap: 12,
  },

  navBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#f0eff8",
    cursor: "pointer",
    fontSize: 14,
  },

  primaryBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    background: "#7c6ff7",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },

  heroSection: {
    minHeight: "calc(100vh - 75px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 80px",
    position: "relative",
    overflow: "hidden",
  },

  heroGlow1: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "rgba(124,111,247,0.15)",
    borderRadius: "50%",
    filter: "blur(80px)",
    top: -50,
    left: -50,
  },

  heroGlow2: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "rgba(74,222,128,0.12)",
    borderRadius: "50%",
    filter: "blur(80px)",
    bottom: 0,
    right: 0,
  },

  heroContent: {
    maxWidth: 650,
    zIndex: 2,
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(124,111,247,0.12)",
    color: "#a89cf7",
    fontSize: 13,
    marginBottom: 25,
  },

  heroTitle: {
    fontSize: 68,
    lineHeight: 1.1,
    fontFamily: "'Syne', sans-serif",
    marginBottom: 20,
  },

  gradientText: {
    background: "linear-gradient(90deg,#7c6ff7,#4ade80)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroDesc: {
    fontSize: 18,
    color: "#9b9ab0",
    lineHeight: 1.7,
    marginBottom: 35,
    maxWidth: 560,
  },

  heroButtons: {
    display: "flex",
    gap: 16,
  },

  primaryHeroBtn: {
    padding: "15px 28px",
    borderRadius: 14,
    border: "none",
    background: "#7c6ff7",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },

  secondaryHeroBtn: {
    padding: "15px 28px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },

  heroCard: {
    width: 380,
    background: "#131318",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 28,
    zIndex: 2,
    boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
  },

  cardSub: {
    fontSize: 13,
    color: "#8b8a9e",
    marginTop: 5,
  },

  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c6ff7,#4ade80)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 20,
  },

  matchCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#1b1b22",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c6ff7,#f472b6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },

  matchName: {
    fontSize: 16,
    fontWeight: 600,
  },

  matchMeta: {
    fontSize: 13,
    color: "#8b8a9e",
    marginTop: 4,
  },

  progressWrap: {
    marginTop: 15,
  },

  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressLabel: {
    fontSize: 13,
    color: "#8b8a9e",
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    background: "#22222e",
    overflow: "hidden",
  },

  progressFill: {
    width: "92%",
    height: "100%",
    background: "linear-gradient(90deg,#7c6ff7,#4ade80)",
  },

  featureSection: {
    padding: "100px 80px",
  },

  sectionHead: {
    textAlign: "center",
    marginBottom: 60,
  },

  sectionTitle: {
    fontSize: 44,
    fontFamily: "'Syne', sans-serif",
    marginBottom: 15,
  },

  sectionDesc: {
    color: "#8b8a9e",
    fontSize: 17,
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 22,
  },

  featureCard: {
    background: "#131318",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20,
    padding: 28,
  },

  featureIcon: {
    fontSize: 36,
    marginBottom: 20,
  },

  featureTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 12,
  },

  featureText: {
    color: "#8b8a9e",
    lineHeight: 1.7,
    fontSize: 14,
  },

  ctaSection: {
    padding: "0 80px 100px",
  },

  ctaCard: {
    background: "linear-gradient(135deg,#7c6ff7,#5b50d6)",
    borderRadius: 30,
    padding: "70px 40px",
    textAlign: "center",
  },

  ctaTitle: {
    fontSize: 46,
    fontFamily: "'Syne', sans-serif",
    marginBottom: 18,
  },

  ctaDesc: {
    fontSize: 17,
    opacity: 0.9,
    marginBottom: 35,
  },

};